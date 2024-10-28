using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IFuelRepository
    {
        Task<IEnumerable<Fuel>> GetAllFuelsAsync();
        void AddFuel(Fuel fuel);
        void DeleteFuel(int FuelId);
        Task<Fuel> FindFuel(int id);
    }
}
