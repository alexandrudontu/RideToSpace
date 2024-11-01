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
        public async Task<IActionResult> AddVehiclePhoto(IFormFile file, int vehId)
        {
            var result = await photoService.UploadPhotoAsync(file);
            if (result.Error != null)
            {
                return BadRequest(result.Error.Message);
            }
            var vehicle = await uow.VehicleRepository.GetVehicleDetailsAsync(vehId);

            var photo = new Photo
            {
                ImageUrl = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };
            if(vehicle.Photos.Count == 0)
            {
                photo.IsPrimary = true;
            }

            vehicle.Photos.Add(photo);
            await uow.SaveAsync();

            return StatusCode(201);
        }
    }
}
