using Microsoft.AspNetCore.Mvc;
using Jobster.Data;
using Jobster.Models;
using Jobster.Dtos;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;

namespace Jobster.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;

        public AuthController (AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        } 

        //POST: api/auth/login
        [HttpPost("login")]
        //[FromBody] để nhận dữ liệu từ body của request
        public async Task<IActionResult> Login([FromBody] LoginDto request)
        {
            //Tìm user đầu tiên có email trùng với email trong request
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            //Kiểm tra user có tồn tại và mật khẩu có đúng không
            if(user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                return Unauthorized("Email hoặc mật khẩu không chính xác");
            }
            //1.Tạo các thông tin định danh khi login thành công
            //claims: gồm userId và email mà ta muốn gói và trong Token
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email)
            };

            //2.Lấy khóa bí mật từ file appsettings.json
            // Tạo ra chữ ký để đảm bảo token không thể là giả mạo (mã bí mật và thuật toán băm)
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            //3.Tạo token
            var token = new JwtSecurityToken(
                //Người phát hành token
                issuer: _config["Jwt:Issuer"],
                //Người nhận token
                audience: _config["Jwt:Audience"],
                //Thông tin định danh
                claims: claims,
                //Thời gian hết hạn của token
                expires: DateTime.Now.AddHours(2),
                //Chữ ký của token
                signingCredentials: creds
            );

            //4.Trả về Token cho người dùng
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            //Nếu đăng nhập thành công thì trả về thông tin user
            return Ok(new {
                message = "Đăng nhập thành công",
                token = jwt,
                user = new {user.Id, user.Email}});

        }

        //POST: api/auth/register
        [HttpPost("register")]
        public async Task<IActionResult> Register ([FromBody] RegisterDto request)
        {
            //Check xem email được đăng ký chưa
            //User: Model trong database
            if(await _context.Users.AnyAsync(u => u.Email == request.Email))
            {
                return BadRequest("Email đã được sử dụng");
            }
            // Tạo user mới và mã hóa mk
            var user = new User
            {
                Email = request.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
                CreatedAt = DateTime.Now
            };

            //Lưu vào database thông qua _context
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            //Trả về thông tin user vừa đăng ký
            return Ok(new {
                message = "Đăng ký thành công",
                user = new {user.Id, user.Email}
            });
        }
    }
}