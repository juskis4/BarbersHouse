using Microsoft.AspNetCore.Builder;
using barbershouse.api.Services;
using barbershouse.api.Data;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using barbershouse.api.Repositories;
using barbershouse.api.Profiles;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();

builder.Services.AddAutoMapper(typeof(Program).Assembly);


builder.Services.AddScoped<IBarbersRepository, BarbersRepository>(); 
builder.Services.AddScoped<IBarbersService, BarbersService>();
builder.Services.AddScoped<IServicesRepository, ServicesRepository>(); 
builder.Services.AddScoped<IServicesService, ServicesService>();

builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowMyOrigin",
            builder => builder.WithOrigins("http://localhost:3000"));
    });

Console.WriteLine("Connection String: " + builder.Configuration.GetConnectionString("DefaultConnection"));
builder.Services.AddDbContext<DbDataContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
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
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
});

app.UseHttpsRedirection();

app.UseCors("AllowMyOrigin");

app.UseAuthorization();

app.MapControllers();


app.Run();