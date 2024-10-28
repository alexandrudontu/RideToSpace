using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FuelController : ControllerBase
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;

        public FuelController(IUnitOfWork uow, IMapper mapper)
        {
            this.uow = uow;
            this.mapper = mapper;
        }

        // GET api/fuel
        [HttpGet]
        public async Task<IActionResult> GetFuels()
        {
            var fuels = await uow.FuelRepository.GetAllFuelsAsync();
            var fuelsDto = mapper.Map<IEnumerable<FuelDto>>(fuels);
            return Ok(fuelsDto);
        }

        [HttpPost("post")]
        public async Task<IActionResult> AddFuel(FuelDto fuelDto)
        {
            var fuel = mapper.Map<Fuel>(fuelDto);

            uow.FuelRepository.AddFuel(fuel);
            await uow.SaveAsync();
            return StatusCode(201);
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateFuel(int id, FuelDto fuelDto)
        {
            var fuelFromDb = await uow.FuelRepository.FindFuel(id);
            mapper.Map(fuelDto, fuelFromDb);
            await uow.SaveAsync();
            return StatusCode(200);
        }

        [HttpPut("updateFuelName/{id}")]
        public async Task<IActionResult> UpdateFuel(int id, FuelUpdateDto fuelDto)
        {
            var fuelFromDb = await uow.FuelRepository.FindFuel(id);
            mapper.Map(fuelDto, fuelFromDb);
            await uow.SaveAsync();
            return StatusCode(200);
        }

        [HttpPatch("update/{id}")]
        public async Task<IActionResult> UpdateFuelPatch(int id, JsonPatchDocument<Fuel> fuelToPatch)
        {
            var fuelFromDb = await uow.FuelRepository.FindFuel(id);
            fuelToPatch.ApplyTo(fuelFromDb, ModelState);
            await uow.SaveAsync();
            return StatusCode(200);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteFuel(int id)
        {
            uow.FuelRepository.DeleteFuel(id);
            await uow.SaveAsync();
            return Ok(id);
        }
    }
}
