using System;
using System.Threading.Tasks;
using barbershouse.api.Controllers;
using barbershouse.api.Services;
using barbershouse.api.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace barbershouse.api.Tests.Controllers;

public class AdminAuthControllerTests
{
    [Fact]
    public async Task Login_ReturnsOkResult_WhenLoginIsSuccessful()
    {
        // Arrange
        var loginModel = new LoginViewModel { Username = "admin", Password = "password" };
        var loginResult = new LoginResultViewModel { Success = true, Message = "Login successful", Token = "token" };

        var mockService = new Mock<IAdminAuthService>();
        mockService.Setup(service => service.LoginAsync(loginModel)).ReturnsAsync(loginResult);

        var controller = new AdminAuthController(mockService.Object);

        // Act
        var result = await controller.Login(loginModel);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var returnedResult = Assert.IsType<LoginResultViewModel>(okResult.Value);
        Assert.Equal(loginResult.Success, returnedResult.Success);
        Assert.Equal(loginResult.Message, returnedResult.Message);
        Assert.Equal(loginResult.Token, returnedResult.Token);
    }

    [Fact]
    public async Task Login_ReturnsUnauthorized_WhenLoginFails()
    {
        // Arrange
        var loginModel = new LoginViewModel { Username = "admin", Password = "wrongpassword" };
        var loginResult = new LoginResultViewModel { Success = false, Message = "Invalid credentials" };

        var mockService = new Mock<IAdminAuthService>();
        mockService.Setup(service => service.LoginAsync(loginModel)).ReturnsAsync(loginResult);

        var controller = new AdminAuthController(mockService.Object);

        // Act
        var result = await controller.Login(loginModel);

        // Assert
        var unauthorizedResult = Assert.IsType<UnauthorizedObjectResult>(result);
        var returnedResult = Assert.IsType<LoginResultViewModel>(unauthorizedResult.Value);
        Assert.Equal(loginResult.Success, returnedResult.Success);
        Assert.Equal(loginResult.Message, returnedResult.Message);
    }

    [Fact]
    public async Task Login_ReturnsInternalServerError_WhenExceptionThrown()
    {
        // Arrange
        var loginModel = new LoginViewModel { Username = "admin", Password = "password" };

        var mockService = new Mock<IAdminAuthService>();
        mockService.Setup(service => service.LoginAsync(loginModel)).ThrowsAsync(new Exception("Database error"));

        var controller = new AdminAuthController(mockService.Object);

        // Act
        var result = await controller.Login(loginModel);

        // Assert
        var statusCodeResult = Assert.IsType<ObjectResult>(result);
        Assert.Equal(500, statusCodeResult.StatusCode);
        Assert.Contains("Internal server error: Database error", statusCodeResult.Value.ToString());
    }

    [Fact]
    public async Task Register_ReturnsOkResult_WhenRegistrationIsSuccessful()
    {
        // Arrange
        var registerModel = new RegisterAdminViewModel { Username = "newadmin", Password = "password" };
        var registerResult = new RegistrationResultViewModel { Success = true, Message = "Registration successful" };

        var mockService = new Mock<IAdminAuthService>();
        mockService.Setup(service => service.RegisterAsync(registerModel)).ReturnsAsync(registerResult);

        var controller = new AdminAuthController(mockService.Object);

        // Act
        var result = await controller.Register(registerModel);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var returnedResult = Assert.IsType<RegistrationResultViewModel>(okResult.Value);
        Assert.Equal(registerResult.Success, returnedResult.Success);
        Assert.Equal(registerResult.Message, returnedResult.Message);
    }

    [Fact]
    public async Task Register_ReturnsBadRequest_WhenRegistrationFails()
    {
        // Arrange
        var registerModel = new RegisterAdminViewModel { Username = "newadmin", Password = "password"};
        var registerResult = new RegistrationResultViewModel { Success = false, Message = "Username already taken" };

        var mockService = new Mock<IAdminAuthService>();
        mockService.Setup(service => service.RegisterAsync(registerModel)).ReturnsAsync(registerResult);

        var controller = new AdminAuthController(mockService.Object);

        // Act
        var result = await controller.Register(registerModel);

        // Assert
        var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
        Assert.Equal(registerResult.Message, badRequestResult.Value);
    }

    [Fact]
    public async Task Register_ReturnsInternalServerError_WhenExceptionThrown()
    {
        // Arrange
        var registerModel = new RegisterAdminViewModel { Username = "newadmin", Password = "password"};

        var mockService = new Mock<IAdminAuthService>();
        mockService.Setup(service => service.RegisterAsync(registerModel)).ThrowsAsync(new Exception("Database error"));

        var controller = new AdminAuthController(mockService.Object);

        // Act
        var result = await controller.Register(registerModel);

        // Assert
        var statusCodeResult = Assert.IsType<ObjectResult>(result);
        Assert.Equal(500, statusCodeResult.StatusCode);
        Assert.Contains("Internal server error: Database error", statusCodeResult.Value.ToString());
    }
}
