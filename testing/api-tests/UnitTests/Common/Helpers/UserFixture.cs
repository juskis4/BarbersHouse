using System;
using System.Collections.Generic;
using System.Security.Claims;
using barbershouse.api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Moq;

namespace barbershouse.api.Tests.Common.Helpers;

public class UserFixture : IDisposable
{
    public ClaimsPrincipal AdminUser { get; }
    public ClaimsPrincipal RegularUser { get; }

    public UserFixture()
    {
        AdminUser = CreateAdminUser();
        RegularUser = CreateRegularUser();
    }

    private ClaimsPrincipal CreateAdminUser()
    {
        var adminClaims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, "testAdmin"),
            new Claim(ClaimTypes.Role, "Admin")
        };
        var identity = new ClaimsIdentity(adminClaims, "TestAuthType");
        return new ClaimsPrincipal(identity);
    }

    private ClaimsPrincipal CreateRegularUser()
    {
        var userClaims = new List<Claim> { new Claim(ClaimTypes.Name, "testUser") };
        var identity = new ClaimsIdentity(userClaims, "TestAuthType");
        return new ClaimsPrincipal(identity);
    }

    //public Mock<IBarbersService> MockBarbersService { get; } = new Mock<IBarbersService>();

    public ControllerContext CreateControllerContext(ClaimsPrincipal user, Mock<IBarbersService> mockBarbersService)
    {
        return new ControllerContext
        {
            HttpContext = new DefaultHttpContext
            {
                User = user,
                RequestServices = new ServiceCollection()
                    .AddSingleton(mockBarbersService.Object)
                    .BuildServiceProvider()
            }
        };
    }

    public void Dispose()
    {

    }
}
