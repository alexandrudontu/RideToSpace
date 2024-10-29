namespace WebAPI.Interfaces
{
    public interface IUnitOfWork
    {
        IFuelRepository FuelRepository { get; }
        IUserRepository UserRepository { get; }
        Task<bool> SaveAsync();
    }
}
