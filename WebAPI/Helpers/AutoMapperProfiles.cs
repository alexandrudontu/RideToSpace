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
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<Vehicle, VehicleListDto>()
                .ForMember(d => d.Reusability, opt => opt.MapFrom(src => src.Reusability.Name))
                .ForMember(d => d.Photo, opt => opt.MapFrom(src => src.Photos
                                .FirstOrDefault(p => p.IsPrimary).ImageUrl));

            CreateMap<Vehicle, VehicleDetailsDto>()
                .ForMember(d => d.Reusability, opt => opt.MapFrom(src => src.Reusability.Name))
                .ForMember(d => d.Fuel, opt => opt.MapFrom(src => src.Fuel.Name))
                .ForMember(d => d.PostedBy, opt => opt.MapFrom(src => new UserDto
                {
                    UserName = src.User.UserName,
                    Email = src.User.Email
                })); ;

            CreateMap<Reusability, KeyValuePairDto>().ReverseMap();
            CreateMap<Vehicle, VehicleDto>().ReverseMap();
            CreateMap<Photo, PhotoDto>().ReverseMap();
        }
    }
}
