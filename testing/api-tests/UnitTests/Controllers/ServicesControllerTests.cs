using barbershouse.api.Controllers;
using barbershouse.api.Models;
using barbershouse.api.Services;
using barbershouse.api.ViewModels;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;
using barbershouse.api.Tests.Common.Helpers;
using AutoMapper;

namespace barbershouse.api.Tests.Controllers;

public class ServicesControllerTests : IClassFixture<UserFixture>
{
    private readonly IMapper _mapper;
    private readonly UserFixture _fixture;

    public ServicesControllerTests(UserFixture fixture)
    {
        _mapper = TestMapper.CreateMapper();
        _fixture = fixture;
    }

    [Fact]
    public async Task GetAllServices_ReturnsOkResult_WithListOfServices()
    {
        // Arrange
        var services = new List<GetServiceViewModel>
    {
        new GetServiceViewModel { ServiceId = 1, Title = "Service1" },
        new GetServiceViewModel { ServiceId = 2, Title = "Service2" }
    };
        var mockService = new Mock<IServicesService>();
        var controller = _fixture.CreateControllerWithMockService<ServicesController, IServicesService>(mockService);
        mockService.Setup(service => service.GetAllServicesAsync()).ReturnsAsync(services);

        // Act
        var result = await controller.GetAllServices();

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var returnedServices = Assert.IsAssignableFrom<IEnumerable<GetServiceViewModel>>(okResult.Value);
        Assert.Equal(2, returnedServices.Count());
    }

    [Fact]
    public async Task GetService_ReturnsOkResult_WhenServiceExists()
    {
        // Arrange
        var service = new ServiceViewModel { ServiceId = 1, Title = "Service1" };
        var mockService = new Mock<IServicesService>();
        var controller = _fixture.CreateControllerWithMockService<ServicesController, IServicesService>(mockService);
        _fixture.SetUserInControllerContext(controller, _fixture.AdminUser);
        mockService.Setup(s => s.GetServiceByIdAsync(service.ServiceId)).ReturnsAsync(service);

        // Act
        var result = await controller.GetService(service.ServiceId);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var returnedService = Assert.IsType<ServiceViewModel>(okResult.Value);
        Assert.Equal(service.ServiceId, returnedService.ServiceId);
    }

    [Fact]
    public async Task GetService_ReturnsNotFound_WhenServiceDoesNotExist()
    {
        // Arrange
        var serviceId = 999;
        var mockService = new Mock<IServicesService>();
        var controller = _fixture.CreateControllerWithMockService<ServicesController, IServicesService>(mockService);
        _fixture.SetUserInControllerContext(controller, _fixture.AdminUser);
        mockService.Setup(s => s.GetServiceByIdAsync(serviceId)).ReturnsAsync((ServiceViewModel?)null);

        // Act
        var result = await controller.GetService(serviceId);

        // Assert
        Assert.IsType<NotFoundResult>(result.Result);
    }

    [Fact]
    public async Task AddServiceForBarber_ReturnsOk_WhenServiceIsAdded()
    {
        // Arrange
        var barberId = 1;
        var model = new AddServiceViewModel { Title = "New Service" };
        var mockService = new Mock<IServicesService>();
        var controller = _fixture.CreateControllerWithMockService<ServicesController, IServicesService>(mockService);
        _fixture.SetUserInControllerContext(controller, _fixture.AdminUser);

        // Assuming AddServiceForBarberAsync returns a ServiceViewModel, not a Service
        var serviceViewModel = new ServiceViewModel { ServiceId = 1, Title = model.Title };
        mockService.Setup(s => s.AddServiceForBarberAsync(barberId, model)).ReturnsAsync(serviceViewModel);

        // Act
        var result = await controller.AddServiceForBarber(barberId, model);

        // Assert
        Assert.IsType<OkResult>(result);
    }

    [Fact]
    public async Task AddServiceForBarber_ReturnsBadRequest_WhenServiceThrowsArgumentException()
    {
        // Arrange
        var barberId = 1;
        var model = new AddServiceViewModel { Title = "New Service" };
        var mockService = new Mock<IServicesService>();
        var controller = _fixture.CreateControllerWithMockService<ServicesController, IServicesService>(mockService);
        _fixture.SetUserInControllerContext(controller, _fixture.AdminUser);
        mockService.Setup(s => s.AddServiceForBarberAsync(barberId, model)).ThrowsAsync(new ArgumentException("Service already exists"));

        // Act
        var result = await controller.AddServiceForBarber(barberId, model);

        // Assert
        var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
        Assert.Equal("Service already exists", badRequestResult.Value);
    }

    [Fact]
    public async Task AddServiceForBarber_ReturnsInternalServerError_WhenServiceThrowsException()
    {
        // Arrange
        var barberId = 1;
        var model = new AddServiceViewModel { Title = "New Service" };
        var mockService = new Mock<IServicesService>();
        var controller = _fixture.CreateControllerWithMockService<ServicesController, IServicesService>(mockService);
        _fixture.SetUserInControllerContext(controller, _fixture.AdminUser);
        mockService.Setup(s => s.AddServiceForBarberAsync(barberId, model)).ThrowsAsync(new Exception("Database error"));

        // Act
        var result = await controller.AddServiceForBarber(barberId, model);

        // Assert
        var statusCodeResult = Assert.IsType<ObjectResult>(result);
        Assert.Equal(500, statusCodeResult.StatusCode);
        Assert.Contains("Internal server error. Database error", statusCodeResult.Value.ToString());
    }

    [Fact]
    public async Task UpdateService_ReturnsNoContent_WhenPatchIsValid()
    {
        // Arrange
        var serviceId = 1;
        var patchDoc = new JsonPatchDocument<Service>();
        patchDoc.Replace(s => s.Title, "Updated Title");
        var mockService = new Mock<IServicesService>();
        var controller = _fixture.CreateControllerWithMockService<ServicesController, IServicesService>(mockService);
        _fixture.SetUserInControllerContext(controller, _fixture.AdminUser);
        mockService.Setup(s => s.UpdateServiceAsync(serviceId, patchDoc)).Returns(Task.CompletedTask);

        // Act
        var result = await controller.UpdateService(serviceId, patchDoc);

        // Assert
        Assert.IsType<NoContentResult>(result);
        mockService.Verify(s => s.UpdateServiceAsync(serviceId, patchDoc), Times.Once);
    }

    [Fact]
    public async Task UpdateService_ReturnsNotFound_WhenServiceDoesNotExist()
    {
        // Arrange
        var serviceId = 999;
        var patchDoc = new JsonPatchDocument<Service>();
        patchDoc.Replace(s => s.Title, "Updated Title");
        var mockService = new Mock<IServicesService>();
        var controller = _fixture.CreateControllerWithMockService<ServicesController, IServicesService>(mockService);
        _fixture.SetUserInControllerContext(controller, _fixture.AdminUser);
        mockService.Setup(s => s.UpdateServiceAsync(serviceId, patchDoc)).ThrowsAsync(new ArgumentException("Service not found"));

        // Act
        var result = await controller.UpdateService(serviceId, patchDoc);

        // Assert
        var notFoundResult = Assert.IsType<NotFoundObjectResult>(result);
        Assert.Equal("Service not found", notFoundResult.Value);
    }

    [Fact]
    public async Task UpdateService_ReturnsInternalServerError_WhenServiceThrowsException()
    {
        // Arrange
        var serviceId = 1;
        var patchDoc = new JsonPatchDocument<Service>();
        patchDoc.Replace(s => s.Title, "Updated Title");
        var mockService = new Mock<IServicesService>();
        var controller = _fixture.CreateControllerWithMockService<ServicesController, IServicesService>(mockService);
        _fixture.SetUserInControllerContext(controller, _fixture.AdminUser);
        mockService.Setup(s => s.UpdateServiceAsync(serviceId, patchDoc)).ThrowsAsync(new Exception("Database error"));

        // Act
        var result = await controller.UpdateService(serviceId, patchDoc);

        // Assert
        var statusCodeResult = Assert.IsType<ObjectResult>(result);
        Assert.Equal(500, statusCodeResult.StatusCode);
        Assert.Contains("Internal server error: Database error", statusCodeResult.Value.ToString());
    }

    [Fact]
    public async Task DeleteService_ReturnsNoContent_WhenServiceIsDeleted()
    {
        // Arrange
        var serviceId = 1;
        var mockService = new Mock<IServicesService>();
        var controller = _fixture.CreateControllerWithMockService<ServicesController, IServicesService>(mockService);
        _fixture.SetUserInControllerContext(controller, _fixture.AdminUser);
        mockService.Setup(s => s.DeleteServiceAsync(serviceId)).Returns(Task.CompletedTask);

        // Act
        var result = await controller.DeleteService(serviceId);

        // Assert
        Assert.IsType<NoContentResult>(result);
        mockService.Verify(s => s.DeleteServiceAsync(serviceId), Times.Once);
    }

    [Fact]
    public async Task DeleteService_ReturnsNotFound_WhenServiceDoesNotExist()
    {
        // Arrange
        var serviceId = 999;
        var mockService = new Mock<IServicesService>();
        var controller = _fixture.CreateControllerWithMockService<ServicesController, IServicesService>(mockService);
        _fixture.SetUserInControllerContext(controller, _fixture.AdminUser);
        mockService.Setup(s => s.DeleteServiceAsync(serviceId)).ThrowsAsync(new ArgumentException("Service not found"));

        // Act
        var result = await controller.DeleteService(serviceId);

        // Assert
        var notFoundResult = Assert.IsType<NotFoundObjectResult>(result);
        Assert.Equal("Service not found", notFoundResult.Value);
    }

    [Fact]
    public async Task DeleteService_ReturnsInternalServerError_WhenServiceThrowsException()
    {
        // Arrange
        var serviceId = 1;
        var mockService = new Mock<IServicesService>();
        var controller = _fixture.CreateControllerWithMockService<ServicesController, IServicesService>(mockService);
        _fixture.SetUserInControllerContext(controller, _fixture.AdminUser);
        mockService.Setup(s => s.DeleteServiceAsync(serviceId)).ThrowsAsync(new Exception("Database error"));

        // Act
        var result = await controller.DeleteService(serviceId);

        // Assert
        var statusCodeResult = Assert.IsType<ObjectResult>(result);
        Assert.Equal(500, statusCodeResult.StatusCode);
        Assert.Contains("Internal server error: Database error", statusCodeResult.Value.ToString());
    }
}
