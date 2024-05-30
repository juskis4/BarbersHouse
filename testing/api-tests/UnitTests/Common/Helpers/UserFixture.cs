using System;
using System.Collections.Generic;
using System.Security.Claims;
using barbershouse.api.Controllers;
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

    // generic controller with mock service setup
    public TController CreateControllerWithMockService<TController, TService>(Mock<TService> mockService)
        where TController : ControllerBase
        where TService : class
    {
        var serviceProvider = new ServiceCollection()
            .AddSingleton(mockService.Object) 
            .BuildServiceProvider();

        var controller = (TController)Activator.CreateInstance(typeof(TController), mockService.Object);
        if (controller != null)
        {
            controller.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext { RequestServices = serviceProvider }
            };
        }

        return controller;
    }

    public void SetUserInControllerContext(ControllerBase controller, ClaimsPrincipal user)
    {
        controller.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext
            {
                User = user,
                RequestServices = controller.ControllerContext.HttpContext.RequestServices 
            }
        };
    }

    public void Dispose()
    {
        // No unmanaged resources to release, so this method is intentionally left empty
    }
}
