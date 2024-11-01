using System.ComponentModel.DataAnnotations.Schema;
using WebAPI.Models;

namespace WebAPI.DTOs
{
    public class VehicleDto
    {
        public string Name { get; set; }
        public int ReusabilityId { get; set; }
        public int FuelId { get; set; }
        public bool Crew { get; set; }
        public int PayloadCapacity { get; set; }
        public int Price { get; set; }
        public int Security { get; set; }
        public int Height { get; set; }
        public int Mass { get; set; }
        public bool Operational { get; set; }
        public string Description { get; set; }
    }
}
