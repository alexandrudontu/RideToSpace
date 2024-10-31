using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IVehicleRepository
    {
        Task<IEnumerable<Vehicle>> GetVehiclesAsync(bool crew);
        Task<Vehicle> GetVehicleDetailsAsync(int id);
        void AddVehicle(Vehicle vehicle);
        void DeleteVehicle(int id);
    }
}
