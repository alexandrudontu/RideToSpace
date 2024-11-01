namespace WebAPI.Interfaces
{
    public interface IUnitOfWork
    {
        IFuelRepository FuelRepository { get; }
        IUserRepository UserRepository { get; }
        IVehicleRepository VehicleRepository { get; }
        IReusabilityRepository ReusabilityRepository { get; }
        Task<bool> SaveAsync();
    }
}
