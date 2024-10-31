using static System.Runtime.InteropServices.JavaScript.JSType;
using WebAPI.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    public class Vehicle
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int ReusabilityId { get; set; }
        public Reusability Reusability { get; set; }
        public int FuelId { get; set; }
        public Fuel Fuel { get; set; }
        public bool Crew { get; set; }
        public int PayloadCapacity { get; set; }
        public int Price { get; set; }
        public int Security { get; set; }
        public int Height { get; set; }
        public int Mass { get; set; }
        public bool Operational { get; set; }
        public string Description { get; set; }
        public ICollection<Photo> Photos { get; set; }

        [ForeignKey("User")]
        public int PostedBy { get; set; }
        public User User { get; set; }
    }
}
