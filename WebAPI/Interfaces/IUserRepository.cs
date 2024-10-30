using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IUserRepository
    {
        Task<User> Authenticate(string email, string password);
        void Register(string userName, string email, string password);

        Task<bool> UserAlreadyExists(string email);
    }
}
