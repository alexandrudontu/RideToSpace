﻿using WebAPI.Data.Repo;
using WebAPI.Interfaces;

namespace WebAPI.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext dc;

        public UnitOfWork(DataContext dc)
        {
            this.dc = dc;
        }
        public IFuelRepository FuelRepository => 
            new FuelRepository(dc);

        public IUserRepository UserRepository =>
            new UserRepository(dc);

        public IVehicleRepository VehicleRepository => 
            new VehicleRepository(dc);

        public IReusabilityRepository ReusabilityRepository => 
            new ReusabilityRepository(dc);

        public async Task<bool> SaveAsync()
        {
            return await dc.SaveChangesAsync() > 0;
        }
    }
}
