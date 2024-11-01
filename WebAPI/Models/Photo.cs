using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    [Table("Photos")]
    public class Photo
    {
        public int Id { get; set; }
        [Required]
        public string PublicId { get; set; }
        [Required]
        public string ImageUrl { get; set; }
        public bool IsPrimary { get; set; }
        public int VehicleId { get; set; }
        public Vehicle Vehicle { get; set; }
    }
}