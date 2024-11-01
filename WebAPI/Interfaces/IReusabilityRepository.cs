using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IReusabilityRepository
    {
        Task<IEnumerable<Reusability>> GetReusabilityTypesAsync();
    }
}
