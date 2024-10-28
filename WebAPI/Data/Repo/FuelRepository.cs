using Microsoft.EntityFrameworkCore;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Data.Repo
{
    public class FuelRepository : IFuelRepository
    {
        private readonly DataContext dc;

        public FuelRepository(DataContext dc)
        {
            this.dc = dc;
        }
        public void AddFuel(Fuel fuel)
        {
            dc.Fuels.AddAsync(fuel);
        }

        public void DeleteFuel(int FuelId)
        {
            var fuel = dc.Fuels.Find(FuelId);
            dc.Fuels.Remove(fuel);
        }

        public async Task<Fuel> FindFuel(int id)
        {
            return await dc.Fuels.FindAsync(id);
        }

        public async Task<IEnumerable<Fuel>> GetAllFuelsAsync()
        {
            return await dc.Fuels.ToListAsync();
        }
    }
}
