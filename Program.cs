using Jobster.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

//Lấy thông tin cấu hình từ appsetting.json
var jwtSettings = builder.Configuration.GetSection("Jwt");
//Lấy chuỗi bí mật và chuyển sang mảng byte
var key = Encoding.UTF8.GetBytes(jwtSettings["Key"]!);

//Cấu hình dịch vụ Authentication
builder.Services.AddAuthentication(options => { 
    //Dùng JwtBearer để xác thực token 
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
// Thêm JwtBearer vào pipeline
.AddJwtBearer(options => {
    // Cấu hình các tham số xác thực token
    options.TokenValidationParameters = new TokenValidationParameters
    {
        //Xác thực người phát hành token
        ValidateIssuer = true,
        //Xác thực người nhận token
        ValidateAudience = true,
        //Xác thực thời gian tồn tại của token
        ValidateLifetime = true,
        //Xác thực chữ ký của token
        ValidateIssuerSigningKey = true,
        //Cấu hình thông tin xác thực
        ValidIssuer = jwtSettings["Issuer"],
        ValidAudience = jwtSettings["Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(key)
    };
});

builder.Services.AddSwaggerGen(options =>
{
    // 1. Định nghĩa cách Swagger sẽ nhận Token
    options.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Description = "Nhập JWT Token của bạn để xác thực"
    });

    // 2. Yêu cầu Swagger sử dụng Token này cho tất cả các API
    options.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
    {
        {
            new Microsoft.OpenApi.Models.OpenApiSecurityScheme
            {
                Reference = new Microsoft.OpenApi.Models.OpenApiReference
                {
                    Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});


// Add services to the container.
builder.Services.AddControllers();

// Đăng ký Database: Kết nối với SQL Server theo địa chỉ trong appsettings.json
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

// Cấu hình CORS tạo cầu nối giữa Backend và Frontend
builder.Services.AddCors(option => {
    option.AddPolicy("AllowFrontend", 
    policy => policy.WithOrigins("http://localhost:5173").AllowAnyMethod().AllowAnyHeader());
});

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        // Giúp chuyển đổi Enum từ số sang chữ và ngược lại trong JSON
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Cho phép Frontend gọi API
app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
