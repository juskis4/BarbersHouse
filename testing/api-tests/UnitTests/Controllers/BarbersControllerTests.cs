using barbershouse.api.Controllers;
using barbershouse.api.Models;
using barbershouse.api.Services;
using barbershouse.api.ViewModels;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;
using barbershouse.api.Tests.Common.Factories;
using barbershouse.api.Tests.Common.Helpers;
using AutoMapper;

namespace barbershouse.api.Tests.Controllers;

public class BarbersControllerTests : IClassFixture<UserFixture>
{
    private readonly IMapper _mapper;
    private readonly UserFixture _fixture;

    public BarbersControllerTests(UserFixture fixture)
    {
        _mapper = TestMapper.CreateMapper();
        _fixture = fixture;
    }

    [Fact]
    public async Task GetBarberById_ReturnsOkResult_WhenBarberExists()
    {
        // Arrange
        var barber = BarberFactory.CreateBarber();
        var mockService = new Mock<IBarbersService>();
        var controller = _fixture.CreateControllerWithMockService<BarbersController, IBarbersService>(mockService);
        mockService.Setup(service => service.GetBarberByIdAsync(barber.BarberID))
                   .ReturnsAsync(barber);

        // Act
        var result = await controller.GetBarberById(barber.BarberID);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var returnedBarber = Assert.IsType<Barber>(okResult.Value);
        Assert.Equal(barber.BarberID, returnedBarber.BarberID);
    }

    [Fact]
    public async Task GetBarberById_ReturnsNotFound_WhenBarberDoesNotExist()
    {
        // Arrange
        var barberId = 1;
        var mockService = new Mock<IBarbersService>();
        var controller = _fixture.CreateControllerWithMockService<BarbersController, IBarbersService>(mockService);
        mockService.Setup(service => service.GetBarberByIdAsync(barberId)).ReturnsAsync((Barber?)null);

        // Act
        var result = await controller.GetBarberById(barberId);

        // Assert
        var notFoundObjectResult = Assert.IsType<NotFoundObjectResult>(result.Result);
    }

    [Fact]
    public async Task GetBarbersAsync_ReturnsOkResult_WithListOfBarbers()
    {
        // Arrange
        var barbers = BarberFactory.CreateBarbersList(3);
        var mockService = new Mock<IBarbersService>();
        var controller = _fixture.CreateControllerWithMockService<BarbersController, IBarbersService>(mockService);
        var barberResultViewModels = _mapper.Map<IEnumerable<BarberResultViewModel>>(barbers);
        mockService.Setup(service => service.GetAllBarbersAsync())
            .ReturnsAsync(barberResultViewModels);

        // Act
        var result = await controller.GetBarbersAsync();

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var returnedBarbers = Assert.IsAssignableFrom<IEnumerable<BarberResultViewModel>>(okResult.Value);
        Assert.Equal(barbers.Count, returnedBarbers.Count());
    }

    [Fact]
    public async Task GetBarbersAsync_ReturnsInternalServerError_WhenServiceThrowsException()
    {
        // Arrange
        var mockService = new Mock<IBarbersService>();
        var controller = _fixture.CreateControllerWithMockService<BarbersController, IBarbersService>(mockService);
        mockService.Setup(service => service.GetAllBarbersAsync())
            .ThrowsAsync(new Exception("Database connection error"));

        // Act
        var result = await controller.GetBarbersAsync();

        // Assert
        var statusCodeResult = Assert.IsType<ObjectResult>(result.Result);
        Assert.Equal(500, statusCodeResult.StatusCode);
    }

    [Fact]
    public async Task GetBarbersAsync_ReturnsOkResult_WithEmptyList_WhenNoBarbersExist()
    {
        // Arrange
        var emptyList = new List<BarberResultViewModel>();
        var mockService = new Mock<IBarbersService>();
        var controller = _fixture.CreateControllerWithMockService<BarbersController, IBarbersService>(mockService);
        mockService.Setup(service => service.GetAllBarbersAsync())
            .ReturnsAsync(emptyList);

        // Act
        var result = await controller.GetBarbersAsync();

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var returnedBarbers = Assert.IsAssignableFrom<IEnumerable<BarberResultViewModel>>(okResult.Value);
        Assert.Empty(returnedBarbers);
    }

    [Fact]
    public async Task GetBarbersWithServicesAsync_ReturnsOkResult_WithListOfBarbersWithServices()
    {
        // Arrange
        var barbersWithServices = BarberFactory.CreateBarbersList(3, withServices: true);
        var barberWithServicesViewModels = _mapper.Map<IEnumerable<BarberWithServicesViewModel>>(barbersWithServices);
        var mockService = new Mock<IBarbersService>();
        var controller = _fixture.CreateControllerWithMockService<BarbersController, IBarbersService>(mockService);
        mockService.Setup(service => service.GetAllBarbersWithServicesAsync())
            .ReturnsAsync(barberWithServicesViewModels);

        // Act
        var result = await controller.GetBarbersWithServicesAsync();

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var returnedBarbers = Assert.IsAssignableFrom<IEnumerable<BarberWithServicesViewModel>>(okResult.Value);
        Assert.Equal(barbersWithServices.Count(), returnedBarbers.Count());
    }

    [Fact]
    public async Task GetBarbersWithServicesAsync_ReturnsInternalServerError_WhenServiceThrowsException()
    {
        // Arrange
        var mockService = new Mock<IBarbersService>();
        var controller = _fixture.CreateControllerWithMockService<BarbersController, IBarbersService>(mockService);
        mockService.Setup(service => service.GetAllBarbersWithServicesAsync())
            .ThrowsAsync(new Exception("Database connection error"));

        // Act
        var result = await controller.GetBarbersWithServicesAsync();

        // Assert
        var statusCodeResult = Assert.IsType<ObjectResult>(result.Result);
        Assert.Equal(500, statusCodeResult.StatusCode);
    }

    [Fact]
    public async Task GetBarbersWithServicesAsync_ReturnsOkResult_WithEmptyList_WhenNoBarbersWithServicesExist()
    {
        // Arrange
        var emptyList = new List<BarberWithServicesViewModel>();
        var mockService = new Mock<IBarbersService>();
        var controller = _fixture.CreateControllerWithMockService<BarbersController, IBarbersService>(mockService);
        mockService.Setup(service => service.GetAllBarbersWithServicesAsync())
            .ReturnsAsync(emptyList);

        // Act
        var result = await controller.GetBarbersWithServicesAsync();

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var returnedBarbers = Assert.IsAssignableFrom<IEnumerable<BarberWithServicesViewModel>>(okResult.Value);
        Assert.Empty(returnedBarbers);
    }

    [Fact]
    public async Task DeleteBarber_ExistingBarber_ReturnsNoContent()
    {
        // Arrange
        var barberId = 1;
        var mockService = new Mock<IBarbersService>();
        var controller = _fixture.CreateControllerWithMockService<BarbersController, IBarbersService>(mockService);
        _fixture.SetUserInControllerContext(controller, _fixture.AdminUser);
        mockService.Setup(service => service.DeleteBarberAsync(barberId)).Returns(Task.CompletedTask);

        // Act
        var result = await controller.DeleteBarber(barberId);

        // Assert
        Assert.IsType<NoContentResult>(result);
    }

    [Fact]
    public async Task DeleteBarber_NonExistentBarber_ReturnsNotFound()
    {
        // Arrange
        var barberId = 999;
        var mockService = new Mock<IBarbersService>();
        var controller = _fixture.CreateControllerWithMockService<BarbersController, IBarbersService>(mockService);
        _fixture.SetUserInControllerContext(controller, _fixture.AdminUser);
        mockService.Setup(service => service.DeleteBarberAsync(barberId))
                   .ThrowsAsync(new ArgumentException("Barber not found."));

        // Act
        var result = await controller.DeleteBarber(barberId);

        // Assert
        var notFoundResult = Assert.IsType<NotFoundObjectResult>(result);
        Assert.Equal("Barber not found.", notFoundResult.Value);
    }

    [Fact]
    public async Task DeleteBarber_ServiceError_ReturnsInternalServerError()
    {
        // Arrange
        var barberId = 1;
        var mockService = new Mock<IBarbersService>();
        var controller = _fixture.CreateControllerWithMockService<BarbersController, IBarbersService>(mockService);
        _fixture.SetUserInControllerContext(controller, _fixture.AdminUser);
        mockService.Setup(service => service.DeleteBarberAsync(barberId))
                   .ThrowsAsync(new Exception("Database error"));

        // Act
        var result = await controller.DeleteBarber(barberId);

        // Assert
        var errorResult = Assert.IsType<ObjectResult>(result);
        Assert.Equal(500, errorResult.StatusCode);
        Assert.Contains("Internal server error", errorResult.Value?.ToString());
    }

    [Fact]
    public async Task UpdateBarber_ValidPatch_ReturnsNoContent()
    {
        // Arrange
        var barberId = 1;
        var patchDoc = new JsonPatchDocument<Barber>();
        patchDoc.Replace(b => b.Name, "Updated Name");
        var mockService = new Mock<IBarbersService>();
        var controller = _fixture.CreateControllerWithMockService<BarbersController, IBarbersService>(mockService);
        _fixture.SetUserInControllerContext(controller, _fixture.AdminUser);
        mockService.Setup(s => s.UpdateBarberAsync(barberId, patchDoc)).Returns(Task.CompletedTask);

        // Act
        var result = await controller.UpdateBarber(barberId, patchDoc);

        // Assert
        Assert.IsType<NoContentResult>(result);
        mockService.Verify(s => s.UpdateBarberAsync(barberId, patchDoc), Times.Once);
    }

    [Fact]
    public async Task UpdateBarber_InvalidPatch_ReturnsBadRequest()
    {
        // Arrange
        var barberId = 1;
        var patchDoc = new JsonPatchDocument<Barber>();
        patchDoc.Replace(b => b.BarberID, 2);
        var mockService = new Mock<IBarbersService>();
        var controller = _fixture.CreateControllerWithMockService<BarbersController, IBarbersService>(mockService);
        _fixture.SetUserInControllerContext(controller, _fixture.AdminUser);
        mockService.Setup(s => s.UpdateBarberAsync(barberId, patchDoc))
                   .ThrowsAsync(new ArgumentException("Invalid patch operation."));

        // Act
        var result = await controller.UpdateBarber(barberId, patchDoc);

        // Assert
        var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
        Assert.Equal("Invalid patch operation.", badRequestResult.Value);
    }

    [Fact]
    public async Task UpdateBarber_NonExistentBarber_ReturnsNotFound()
    {
        // Arrange
        var barberId = 999;
        var patchDoc = new JsonPatchDocument<Barber>();
        patchDoc.Replace(b => b.Name, "Updated Name");
        var mockService = new Mock<IBarbersService>();
        var controller = _fixture.CreateControllerWithMockService<BarbersController, IBarbersService>(mockService);
        _fixture.SetUserInControllerContext(controller, _fixture.AdminUser);
        mockService.Setup(s => s.UpdateBarberAsync(barberId, patchDoc))
                   .ThrowsAsync(new ArgumentException("Barber not found."));

        // Act
        var result = await controller.UpdateBarber(barberId, patchDoc);

        // Assert
        var notFoundResult = Assert.IsType<BadRequestObjectResult>(result);
        Assert.Equal("Barber not found.", notFoundResult.Value);
    }
}
