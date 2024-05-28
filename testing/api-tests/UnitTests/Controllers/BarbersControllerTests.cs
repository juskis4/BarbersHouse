using barbershouse.api.Controllers;
using barbershouse.api.Models;
using barbershouse.api.Services;
using barbershouse.api.ViewModels;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;
using barbershouse.api.Tests.Common.Factories;
using barbershouse.api.Tests.Common.Helpers;
using AutoMapper;

namespace barbershouse.api.Tests.Controllers;

public class BarbersControllerTests : IClassFixture<UserFixture>
{
    private readonly Mock<IBarbersService> _mockBarbersService;
    private readonly BarbersController _controller;
    private readonly IMapper _mapper;
    private readonly UserFixture _fixture;


    public BarbersControllerTests(UserFixture fixture)
    {
        _mockBarbersService = new Mock<IBarbersService>();
        _mapper = TestMapper.CreateMapper();
        _controller = new BarbersController(_mockBarbersService.Object);
        _fixture = fixture;
    }

    // Test: GetBarberById - Success
    [Fact]
    public async Task GetBarberById_ReturnsOkResult_WhenBarberExists()
    {
        // Arrange
        var barber = BarberFactory.CreateBarber();
        _mockBarbersService.Setup(service => service.GetBarberByIdAsync(barber.BarberID)).ReturnsAsync(barber);

        // Act
        var result = await _controller.GetBarberById(barber.BarberID);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var returnedBarber = Assert.IsType<Barber>(okResult.Value);
        Assert.Equal(barber.BarberID, returnedBarber.BarberID);
    }

    // Test: GetBarberById - Not Found
    [Fact]
    public async Task GetBarberById_ReturnsNotFound_WhenBarberDoesNotExist()
    {
        // Arrange
        var barberId = 1;
        _mockBarbersService.Setup(service => service.GetBarberByIdAsync(barberId)).ReturnsAsync((Barber?)null);

        // Act
        var result = await _controller.GetBarberById(barberId);

        // Assert
        var notFoundObjectResult = Assert.IsType<NotFoundObjectResult>(result.Result);
    }

    [Fact]
    public async Task GetBarbersAsync_ReturnsOkResult_WithListOfBarbers()
    {
        // Arrange
        var barbers = BarberFactory.CreateBarbersList(3); // Create a list of 3 barbers
        var barberResultViewModels = _mapper.Map<IEnumerable<BarberResultViewModel>>(barbers); // Assuming you have a valid AutoMapper configuration
        _mockBarbersService
            .Setup(service => service.GetAllBarbersAsync())
            .ReturnsAsync(barberResultViewModels);

        // Act
        var result = await _controller.GetBarbersAsync();

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var returnedBarbers = Assert.IsAssignableFrom<IEnumerable<BarberResultViewModel>>(okResult.Value);
        Assert.Equal(barbers.Count, returnedBarbers.Count());
    }

    // Test: GetBarbersAsync - Service Throws Exception
    [Fact]
    public async Task GetBarbersAsync_ReturnsInternalServerError_WhenServiceThrowsException()
    {
        // Arrange
        _mockBarbersService.Setup(service => service.GetAllBarbersAsync())
            .ThrowsAsync(new Exception("Database connection error"));

        // Act
        var result = await _controller.GetBarbersAsync();

        // Assert
        var statusCodeResult = Assert.IsType<ObjectResult>(result.Result);
        Assert.Equal(500, statusCodeResult.StatusCode);
    }

    // Test: GetBarbersAsync - Returns Empty List
    [Fact]
    public async Task GetBarbersAsync_ReturnsOkResult_WithEmptyList_WhenNoBarbersExist()
    {
        // Arrange
        var emptyList = new List<BarberResultViewModel>();
        _mockBarbersService.Setup(service => service.GetAllBarbersAsync())
            .ReturnsAsync(emptyList);

        // Act
        var result = await _controller.GetBarbersAsync();

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var returnedBarbers = Assert.IsAssignableFrom<IEnumerable<BarberResultViewModel>>(okResult.Value);
        Assert.Empty(returnedBarbers);
    }

    // Test: GetBarbersWithServicesAsync - Success
    [Fact]
    public async Task GetBarbersWithServicesAsync_ReturnsOkResult_WithListOfBarbersWithServices()
    {
        // Arrange
        var barbersWithServices = BarberFactory.CreateBarbersList(3, withServices: true); // Now includes services
        var barberWithServicesViewModels = _mapper.Map<IEnumerable<BarberWithServicesViewModel>>(barbersWithServices);
        _mockBarbersService
            .Setup(service => service.GetAllBarbersWithServicesAsync())
            .ReturnsAsync(barberWithServicesViewModels);

        // Act
        var result = await _controller.GetBarbersWithServicesAsync();

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var returnedBarbers = Assert.IsAssignableFrom<IEnumerable<BarberWithServicesViewModel>>(okResult.Value);
        Assert.Equal(barbersWithServices.Count(), returnedBarbers.Count());
    }

    // Test: GetBarbersWithServicesAsync - Service Throws Exception
    [Fact]
    public async Task GetBarbersWithServicesAsync_ReturnsInternalServerError_WhenServiceThrowsException()
    {
        // Arrange
        _mockBarbersService.Setup(service => service.GetAllBarbersWithServicesAsync())
            .ThrowsAsync(new Exception("Database connection error"));

        // Act
        var result = await _controller.GetBarbersWithServicesAsync();

        // Assert
        var statusCodeResult = Assert.IsType<ObjectResult>(result.Result);
        Assert.Equal(500, statusCodeResult.StatusCode);
    }

    // Test: GetBarbersWithServicesAsync - Returns Empty List
    [Fact]
    public async Task GetBarbersWithServicesAsync_ReturnsOkResult_WithEmptyList_WhenNoBarbersWithServicesExist()
    {
        // Arrange
        var emptyList = new List<BarberWithServicesViewModel>();
        _mockBarbersService.Setup(service => service.GetAllBarbersWithServicesAsync())
            .ReturnsAsync(emptyList);

        // Act
        var result = await _controller.GetBarbersWithServicesAsync();

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var returnedBarbers = Assert.IsAssignableFrom<IEnumerable<BarberWithServicesViewModel>>(okResult.Value);
        Assert.Empty(returnedBarbers);
    }


    // // Test: AddBarber - Success (Authorized Admin)
    // [Fact]
    // public async Task AddBarber_AuthorizedAdmin_ReturnsCreatedAtAction_WhenValidModel()
    // {
    //     // Arrange
    //     var newBarberModel = new AddBarberViewModel
    //     {
    //         Name = "New Barber",
    //         Email = "newbarber@example.com",
    //         Bio = "Experienced barber",
    //         PhotoUrl = "https://example.com/photo.jpg"
    //     };

    //     var createdBarber = BarberFactory.CreateBarber();

    //     // Use the UserFixture's AdminUser and create the ControllerContext
    //     _controller.ControllerContext = _fixture.CreateControllerContext(_fixture.AdminUser);

    //     // Set up the mock service in the fixture
    //     _fixture.MockBarbersService.Setup(service => service.AddBarberAsync(newBarberModel))
    //                                .ReturnsAsync(createdBarber);

    //     // Act
    //     var result = await _controller.AddBarber(newBarberModel);

    //     // Assert
    //     var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result);
    //     Assert.Equal(nameof(BarbersController.GetBarberById), createdAtActionResult.ActionName);
    //     Assert.Equal(createdBarber, createdAtActionResult.Value);
    // }

    // Test: AddBarber - Failure (Non-Admin User)
    [Fact]
    public async Task AddBarber_NonAdminUser_ReturnsUnauthorized()
    {
        // Arrange
        var newBarberModel = new AddBarberViewModel
        {
            Name = "Test Barber",
            Email = "testbarber@example.com",
            Bio = "This is a test bio.",
            PhotoUrl = "https://example.com/testphoto.jpg"
        };

        // Create a strict mock to verify no unexpected interactions
        var mockBarbersService = new Mock<IBarbersService>(MockBehavior.Strict);

        // Set up the mock to throw UnauthorizedAccessException
        mockBarbersService.Setup(service => service.AddBarberAsync(It.IsAny<AddBarberViewModel>()))
                          .ThrowsAsync(new UnauthorizedAccessException());

        // Pass the mock service to CreateControllerContext
        _controller.ControllerContext = _fixture.CreateControllerContext(
            _fixture.RegularUser,
            mockBarbersService);

        // Act
        var result = await _controller.AddBarber(newBarberModel);

        // Verify that no methods were called on the mock service
        mockBarbersService.VerifyNoOtherCalls();

        // Assert
        Assert.IsType<UnauthorizedResult>(result);


    }

    // // Test: AddBarber - Failure (Invalid Model)
    // [Fact]
    // public async Task AddBarber_InvalidModel_ReturnsBadRequest()
    // {
    //     // Arrange
    //     var invalidModel = new AddBarberViewModel(); // Missing required properties
    //     _controller.ModelState.AddModelError("Name", "Name is required.");

    //     // Act
    //     var result = await _controller.AddBarber(invalidModel);

    //     // Assert
    //     var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
    //     Assert.IsType<SerializableError>(badRequestResult.Value);
    // }
}
