using Microsoft.EntityFrameworkCore;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Data.Repo
{
    public class ReusabilityRepository : IReusabilityRepository
    {
        private readonly DataContext dc;

        public ReusabilityRepository(DataContext dc)
        {
            this.dc = dc;
        }
        public async Task<IEnumerable<Reusability>> GetReusabilityTypesAsync()
        {
            return await dc.Reusabilities.ToListAsync();
        }
    }
}
