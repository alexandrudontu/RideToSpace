namespace WebAPI.DTOs
{
    public class VehicleListDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Reusability { get; set; }
        public bool Crew { get; set; }
        public int Price { get; set; }
        public int PayloadCapacity { get; set; }
    }
}
