
namespace WebAPI.DTOs
{
    public class VehicleDetailsDto : VehicleListDto
    {
        public string Fuel { get; set; }
        public int Security { get; set; }
        public int Height { get; set; }
        public int Mass { get; set; }
        public bool Operational { get; set; }
        public string Description { get; set; }
        public ICollection<PhotoDto> Photos { get; set; }
        public UserDto PostedBy { get; set; }
    }
}