using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebAPI.DTOs;
using WebAPI.Errors;
using WebAPI.Extensions;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class AccountController : BaseController
    {
        private readonly IUnitOfWork uow;
        private readonly IConfiguration configuration;

        public AccountController(IUnitOfWork uow, IConfiguration configuration)
        {
            this.uow = uow;
            this.configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginReqDto loginReq)
        {
            var user = await uow.UserRepository.Authenticate(loginReq.Email, loginReq.Password);
            ApiError apiError = new ApiError();

            if (user == null)
            {
                apiError.ErrorCode = Unauthorized().StatusCode;
                apiError.ErrorMessage = "Invalid email or password";
                apiError.ErrorDetails = "This error appears when provided user id or password does not exist";
                return Unauthorized(apiError);
            }

            var loginRes = new LoginResDto();
            loginRes.Email = user.Email;
            loginRes.Token = CreateJWT(user);
            return Ok(loginRes);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterReqDto registerReq)
        {
            ApiError apiError = new ApiError();

            if (registerReq.Email.IsEmpty() ||
                registerReq.Password.IsEmpty())
            {
                apiError.ErrorCode = BadRequest().StatusCode;
                apiError.ErrorMessage = "Email or password cannot be blank";
                return BadRequest(apiError);
            }

            if (await uow.UserRepository.UserAlreadyExists(registerReq.Email))
            {
                apiError.ErrorCode = BadRequest().StatusCode;
                apiError.ErrorMessage = "User already exists, please try a different email";
                return BadRequest(apiError);
            }

            uow.UserRepository.Register(registerReq.userName, registerReq.Email, registerReq.Password);
            await uow.SaveAsync();
            return StatusCode(201);
        }

        private string CreateJWT(User user)
        {
            var secretKey = configuration.GetSection("AppSettings:Key").Value;
            var key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(secretKey));

            var claims = new Claim[] {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            };

            var signingCredentials = new SigningCredentials(
                key, SecurityAlgorithms.HmacSha256Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(8),
                SigningCredentials = signingCredentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
