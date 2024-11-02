using Microsoft.EntityFrameworkCore;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Data.Repo
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly DataContext dc;

        public VehicleRepository(DataContext dc)
        {
            this.dc = dc;
        }
        public void AddVehicle(Vehicle vehicle)
        {
            dc.Vehicles.Add(vehicle);
        }

        public void DeleteVehicle(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Vehicle>> GetVehiclesAsync(bool crew)
        {
            var vehicles = await dc.Vehicles
                .Include(v => v.Fuel)
                .Include(v => v.Reusability)
                .Where(v => v.Crew == crew)
                .Include(v => v.Photos)
                .ToListAsync();
            return vehicles;
        }
        
        public async Task<Vehicle> GetVehicleDetailsAsync(int id)
        {
            var vehicles = await dc.Vehicles
                .Include(v => v.User)
                .Include(v => v.Fuel)
                .Include(v => v.Reusability)
                .Include(v => v.Photos)
                .Where(v => v.Id == id)
                .FirstAsync();
            return vehicles;
        }

        public async Task<Vehicle> GetVehicleByIdAsync(int id)
        {
            var vehicles = await dc.Vehicles
            .Include(p => p.Photos)
            .Where(p => p.Id == id)
            .FirstOrDefaultAsync();

            return vehicles;
        }
    }
}
