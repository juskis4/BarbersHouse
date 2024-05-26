using barbershouse.api.Services;
using barbershouse.api.Data;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using barbershouse.api.Repositories;
using Microsoft.AspNetCore.ResponseCompression;
using barbershouse.api.Hubs;
using Microsoft.OpenApi.Any;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using barbershouse.api.Models;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Newtonsoft.Json;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers()
    .AddNewtonsoftJson(options =>
    {
        options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
    });
// AutoMapper
builder.Services.AddAutoMapper(typeof(Program).Assembly);

// Barbers
builder.Services.AddScoped<IBarbersRepository, BarbersRepository>();
builder.Services.AddScoped<IBarbersService, BarbersService>();

// Services
builder.Services.AddScoped<IServicesRepository, ServicesRepository>();
builder.Services.AddScoped<IServicesService, ServicesService>();

// Booking
builder.Services.AddScoped<IBookingsRepository, BookingsRepository>();
builder.Services.AddScoped<IBookingService, BookingService>();

// Customers
builder.Services.AddScoped<ICustomersRepository, CustomersRepository>();
builder.Services.AddScoped<ICustomersService, CustomersService>();

// Admin
builder.Services.AddScoped<IAdminAuthService, AdminAuthService>();
builder.Services.AddScoped<IAdminRepository, AdminRepository>();
builder.Services.AddScoped<IPasswordHasher<Admin>, PasswordHasher<Admin>>();

// SignalR
builder.Services.AddSignalR(hubOptions =>
{
    hubOptions.KeepAliveInterval = TimeSpan.FromSeconds(60); // Ping every minute
    hubOptions.ClientTimeoutInterval = TimeSpan.FromMinutes(1.5); // 1.5 minutes timeout
}).AddJsonProtocol(); 

builder.Services.AddResponseCompression(opts =>
{
    opts.MimeTypes = ResponseCompressionDefaults.MimeTypes.Concat(
          ["application/octet-stream"]);
});

// Getting the client url
var firebaseUrl = Environment.GetEnvironmentVariable("FirebaseUrl");
if (string.IsNullOrEmpty(firebaseUrl))
{
    throw new InvalidOperationException("The 'FirebaseUrl' environment variable is not set.");
}
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowMyOrigin",
        builder =>
        {
            builder.WithOrigins("http://localhost:3000", firebaseUrl)
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials();
        });
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("IsAdmin", policy =>
    {
        policy.RequireClaim("isAdmin", "true"); 
    });
});

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    var jwtKey = Environment.GetEnvironmentVariable("jwt"); 
    if (string.IsNullOrEmpty(jwtKey))
    {
        throw new InvalidOperationException("The JWT Key environment variable is not set.");
    }
    
    // JWT validation parameters
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtKey)),
        ValidateIssuer = false,  // Set this to true if you want to validate the issuer of the token
        ValidateAudience = false, // Set this to true if you want to validate the audience of the token
        ClockSkew = TimeSpan.Zero // Set this to a reasonable value if you need clock skew tolerance
    };
});

// Database Configuration (using environment variable)
var connectionString = Environment.GetEnvironmentVariable("DefaultConnection");

if (string.IsNullOrEmpty(connectionString))
{
    throw new InvalidOperationException("The 'DefaultConnection' environment variable is not set.");
}

builder.Services.AddDbContext<DbDataContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Barber House API", Version = "v1" });
    c.MapType<TimeSpan>(() => new OpenApiSchema
    {
        Type = "string",
        Example = new OpenApiString("00:00:00")
    });
});


var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Barber House API");
});

app.UseHttpsRedirection();

// SignalR
app.UseResponseCompression();
app.MapHub<BookingHub>("/bookinghub");

app.UseCors("AllowMyOrigin");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();