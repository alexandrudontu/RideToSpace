namespace WebAPI.Interfaces
{
    public interface IUnitOfWork
    {
        IFuelRepository FuelRepository { get; }
        Task<bool> SaveAsync();
    }
}
