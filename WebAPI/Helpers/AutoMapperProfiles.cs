using AutoMapper;
using WebAPI.DTOs;
using WebAPI.Models;

namespace WebAPI.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Fuel, FuelDto>().ReverseMap();
            CreateMap<Fuel, FuelUpdateDto>().ReverseMap();

        }
    }
}
