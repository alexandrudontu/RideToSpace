using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class ReusabilityController : BaseController
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;

        public ReusabilityController(IUnitOfWork uow, IMapper mapper)
        {
            this.uow = uow;
            this.mapper = mapper;
        }

        [HttpGet("list")]
        public async Task<IActionResult> GetReusabilityTypes()
        {
            var reusabilityTypes = await uow.ReusabilityRepository.GetReusabilityTypesAsync();
            var reusabilityTypesDto = mapper.Map<IEnumerable<KeyValuePairDto>>(reusabilityTypes);
            return Ok(reusabilityTypesDto);
        }
    }
}
