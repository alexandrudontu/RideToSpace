using System.ComponentModel.DataAnnotations;

namespace WebAPI.DTOs
{
    public class FuelDto
    {
        public int Id { get; set; }

        [Required (ErrorMessage = "Name is a mandatory field")]
        [StringLength (20, MinimumLength = 2)]
        public string Name { get; set; }
    }
}
