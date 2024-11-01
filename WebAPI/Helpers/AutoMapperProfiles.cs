using AutoMapper;
using FluentAssertions.Equivalency;
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
            CreateMap<Vehicle, VehicleListDto>()
                .ForMember(d => d.Reusability, opt => opt.MapFrom(src => src.Reusability.Name));

            CreateMap<Vehicle, VehicleDetailsDto>()
                .ForMember(d => d.Reusability, opt => opt.MapFrom(src => src.Reusability.Name))
                .ForMember(d => d.Fuel, opt => opt.MapFrom(src => src.Fuel.Name));

            CreateMap<Reusability, KeyValuePairDto>().ReverseMap();
            CreateMap<Vehicle, VehicleDto>().ReverseMap();
            CreateMap<Photo, PhotoDto>().ReverseMap();
        }
    }
}
