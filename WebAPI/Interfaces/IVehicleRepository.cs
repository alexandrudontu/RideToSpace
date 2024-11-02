using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IVehicleRepository
    {
        Task<IEnumerable<Vehicle>> GetVehiclesAsync(bool crew);
        Task<Vehicle> GetVehicleDetailsAsync(int id);
        Task<Vehicle> GetVehicleByIdAsync(int id);
        void AddVehicle(Vehicle vehicle);
        void DeleteVehicle(int id);
    }
}
