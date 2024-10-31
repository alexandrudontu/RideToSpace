using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs;
using WebAPI.Interfaces;

namespace WebAPI.Controllers
{
    public class VehicleController : BaseController
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;

        public VehicleController(IUnitOfWork uow, IMapper mapper)
        {
            this.uow = uow;
            this.mapper = mapper;
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
    }

    
}
