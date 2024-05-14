using barbershouse.api.Services;
using barbershouse.api.Data;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using barbershouse.api.Repositories;
using Microsoft.AspNetCore.ResponseCompression;
using barbershouse.api.Hubs;
using Microsoft.OpenApi.Any;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();

builder.Services.AddAutoMapper(typeof(Program).Assembly);

builder.Services.AddScoped<IBarbersRepository, BarbersRepository>(); 
builder.Services.AddScoped<IBarbersService, BarbersService>();
builder.Services.AddScoped<IServicesRepository, ServicesRepository>(); 
builder.Services.AddScoped<IServicesService, ServicesService>();
builder.Services.AddScoped<IBookingsRepository, BookingsRepository>(); 
builder.Services.AddScoped<IBookingService, BookingService>();


//  SignalR
builder.Services.AddSignalR().AddJsonProtocol(); 
builder.Services.AddResponseCompression(opts =>
{
   opts.MimeTypes = ResponseCompressionDefaults.MimeTypes.Concat(
         new[] { "application/octet-stream" });
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowMyOrigin",
        builder =>
        {
            var allowedOrigins = new List<string> { "http://localhost:3000" }; 

            var firebaseUrl = Environment.GetEnvironmentVariable("FIREBASE_URL");
            if (!string.IsNullOrEmpty(firebaseUrl))
            {
                allowedOrigins.Add(firebaseUrl);
            }

            builder.WithOrigins(allowedOrigins.ToArray()) 
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials();
        });
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

// builder.Services.AddSwaggerGen(c => {
//     c.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());
//     c.IgnoreObsoleteActions();
//     c.IgnoreObsoleteProperties();
//     c.CustomSchemaIds(type => type.FullName);
// });

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

app.UseAuthorization();

app.MapControllers();


app.Run();
