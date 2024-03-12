using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using barbershouse.api.Services;
using barbershouse.api.Data;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using barbershouse.api.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();

builder.Services.AddScoped<IBarbersRepository, BarbersRepository>(); 
builder.Services.AddScoped<IBarbersService, BarbersService>();

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

app.UseAuthorization();

app.MapControllers();

app.Run();