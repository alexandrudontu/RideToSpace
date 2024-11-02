using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class VehicleController : BaseController
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;
        private readonly IPhotoService photoService;

        public VehicleController(IUnitOfWork uow, IMapper mapper, IPhotoService photoService)
        {
            this.uow = uow;
            this.mapper = mapper;
            this.photoService = photoService;
        }

        [HttpGet("crewrated/{crew}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetVehicleList(bool crew)
        {
            var vehicles = await uow.VehicleRepository.GetVehiclesAsync(crew);
            var vehicleListDTO = mapper.Map<IEnumerable<VehicleListDto>>(vehicles);
            return Ok(vehicleListDTO);
        }

        [HttpGet("details/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetVehicleDetails(int id)
        {
            var vehicle = await uow.VehicleRepository.GetVehicleDetailsAsync(id);
            var vehicleDTO = mapper.Map<VehicleDetailsDto>(vehicle);
            return Ok(vehicleDTO);
        }

        [HttpPost("add")]
        [Authorize]
        public async Task<IActionResult> AddVehicle(VehicleDto vehicleDto)
        {
            var vehicle = mapper.Map<Vehicle>(vehicleDto);
            var userId = GetUserId();
            vehicle.PostedBy = userId;
            uow.VehicleRepository.AddVehicle(vehicle);
            await uow.SaveAsync();
            return StatusCode(201);
        }

        [HttpPost("add/photo/{vehId}")]
        [Authorize]
        public async Task<ActionResult<PhotoDto>> AddVehiclePhoto(IFormFile file, int vehId)
        {
            var result = await photoService.UploadPhotoAsync(file);
            if (result.Error != null)
            {
                return BadRequest(result.Error.Message);
            }
            var userId = GetUserId();
            var vehicle = await uow.VehicleRepository.GetVehicleDetailsAsync(vehId);

            if (vehicle.PostedBy != userId)
            {
                return BadRequest("You are not authorised to upload photo for this property");
            }

            var photo = new Photo
            {
                ImageUrl = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };
            if (vehicle.Photos.Count == 0)
            {
                photo.IsPrimary = true;
            }

            vehicle.Photos.Add(photo);
            
            if(await uow.SaveAsync())
            {
                return mapper.Map<PhotoDto>(photo);
            }
            return BadRequest("Some problem occured in uploading photo");
        }

        [HttpPost("set-primary-photo/{vehId}/{photoPublicId}")]
        [Authorize]
        public async Task<IActionResult> SetPrimaryPhoto(int vehId, string photoPublicId)
        {
            var userId = GetUserId();
            var vehicle = await uow.VehicleRepository.GetVehicleByIdAsync(vehId);

            if (vehicle == null)
            {
                return BadRequest("No such vehicle or photo exists");
            }
            if (vehicle.PostedBy != userId)
            {
                return BadRequest("You are not authorized to change the photo");
            }

            var photo = vehicle.Photos.FirstOrDefault(p => p.PublicId == photoPublicId);

            if (photo == null)
            {
                return BadRequest("No such vehicle or photo exists");
            }

            if (photo.IsPrimary)
            {
                return BadRequest("This is already a primary photo");
            }

            var currentPrimary = vehicle.Photos.FirstOrDefault(p => p.IsPrimary);
            if (currentPrimary != null)
            {
                currentPrimary.IsPrimary = false;
            }
            photo.IsPrimary = true;

            if(await uow.SaveAsync())
            {
                return NoContent();
            }

            return BadRequest("Some error occured, failed to set primary photo");
        }

        [HttpDelete("delete-photo/{vehId}/{photoPublicId}")]
        [Authorize]
        public async Task<IActionResult> DeletePhoto(int vehId, string photoPublicId)
        {
            var userId = GetUserId();
            var vehicle = await uow.VehicleRepository.GetVehicleByIdAsync(vehId);

            if (vehicle == null)
            {
                return BadRequest("No such vehicle or photo exists");
            }
            if (vehicle.PostedBy != userId)
            {
                return BadRequest("You are not authorized to delete the photo");
            }

            var photo = vehicle.Photos.FirstOrDefault(p => p.PublicId == photoPublicId);

            if (photo == null)
            {
                return BadRequest("No such vehicle or photo exists");
            }

            if (photo.IsPrimary)
            {
                return BadRequest("You cannot delete the primary photo");
            }

            var result = await photoService.DeletePhotoAsync(photo.PublicId);
            if (result.Error != null)
            {
                return BadRequest(result.Error.Message);
            }

            vehicle.Photos.Remove(photo);

            if (await uow.SaveAsync())
            {
                return Ok();
            }

            return BadRequest("Some error occured, failed to delete photo");
        }
    }
}
