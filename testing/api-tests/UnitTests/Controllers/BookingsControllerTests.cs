using barbershouse.api.Controllers;
using barbershouse.api.Models;
using barbershouse.api.Services;
using barbershouse.api.ViewModels;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;
using barbershouse.api.Tests.Common.Helpers;

namespace barbershouse.api.Tests.Controllers;

public class BookingsControllerTests
{
    private readonly Mock<IBookingService> _mockBookingService;
    private readonly BookingsController _controller;
    private readonly UserFixture _fixture;

    public BookingsControllerTests()
    {
        _mockBookingService = new Mock<IBookingService>();
        _fixture = new UserFixture();
        _controller = _fixture.CreateControllerWithMockService<BookingsController, IBookingService>(_mockBookingService);
    }

    [Fact]
    public async Task GetBookings_ReturnsOkResult_WithBookings()
    {
        // Arrange
        var bookings = new List<GetBookingsViewModel> { new GetBookingsViewModel() };
        _mockBookingService.Setup(service => service.GetBookingsAsync(null, null, null)).ReturnsAsync(bookings);

        // Act
        var result = await _controller.GetBookings();

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var returnValue = Assert.IsType<List<GetBookingsViewModel>>(okResult.Value);
        Assert.Single(returnValue);
    }

    [Fact]
    public async Task GetBookingById_AdminUser_ReturnsOkResult_WithBooking()
    {
        // Arrange
        var booking = new GetBookingDetailsViewModel();
        _mockBookingService.Setup(service => service.GetBookingByIdAsync(1)).ReturnsAsync(booking);
        _fixture.SetUserInControllerContext(_controller, _fixture.AdminUser);

        // Act
        var result = await _controller.GetBookingById(1);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var returnValue = Assert.IsType<GetBookingDetailsViewModel>(okResult.Value);
    }

    [Fact]
    public async Task GetBookingById_NotFoundResult_WhenBookingDoesNotExist()
    {
        // Arrange
        _mockBookingService.Setup(service => service.GetBookingByIdAsync(1)).ReturnsAsync((GetBookingDetailsViewModel?)null);
        _fixture.SetUserInControllerContext(_controller, _fixture.AdminUser);

        // Act
        var result = await _controller.GetBookingById(1);

        // Assert
        Assert.IsType<NotFoundResult>(result.Result);
    }

    [Fact]
    public async Task AddBookingAsync_ReturnsOkResult_WhenBookingIsAdded()
    {
        // Arrange
        var booking = new AddBookingViewModel();

        // Act
        var result = await _controller.AddBookingAsync(booking);

        // Assert
        Assert.IsType<OkResult>(result);
    }

    [Fact]
    public async Task BookingConfirmation_AdminUser_ReturnsOkResult()
    {
        // Arrange
        _fixture.SetUserInControllerContext(_controller, _fixture.AdminUser);

        // Act
        var result = await _controller.BookingConfirmation(1, 1);

        // Assert
        Assert.IsType<OkResult>(result);
    }

    [Fact]
    public async Task BookingConfirmation_ThrowsArgumentException_ReturnsBadRequest()
    {
        // Arrange
        _mockBookingService.Setup(service => service.ConfirmBooking(1, 1)).ThrowsAsync(new ArgumentException("Invalid booking"));
        _fixture.SetUserInControllerContext(_controller, _fixture.AdminUser);

        // Act
        var result = await _controller.BookingConfirmation(1, 1);

        // Assert
        var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
        Assert.Equal("Invalid booking", badRequestResult.Value);
    }

    [Fact]
    public async Task BookingCancel_AdminUser_ReturnsOkResult()
    {
        // Arrange
        _fixture.SetUserInControllerContext(_controller, _fixture.AdminUser);

        // Act
        var result = await _controller.BookingCancel(1, 1);

        // Assert
        Assert.IsType<OkResult>(result);
    }

    [Fact]
    public async Task UpdateBooking_InvalidPatch_ReturnsNotFound()
    {
        // Arrange
        var bookingId = 1;
        var patchDoc = new JsonPatchDocument<Booking>();
        patchDoc.Replace(b => b.BarberId, 2);

        _mockBookingService.Setup(service => service.UpdateBookingAsync(bookingId, patchDoc))
                           .ThrowsAsync(new ArgumentException("Invalid patch operation"));
        _fixture.SetUserInControllerContext(_controller, _fixture.AdminUser);

        // Act
        var result = await _controller.UpdateBooking(bookingId, patchDoc);

        // Assert
        var notFoundResult = Assert.IsType<NotFoundObjectResult>(result);
        Assert.Equal("Invalid patch operation", notFoundResult.Value);
    }

    [Fact]
    public async Task GetBookingStatistics_AdminUser_ReturnsOkResult_WithStatistics()
    {
        // Arrange
        var stats = new BookingStatisticsViewModel();
        _mockBookingService.Setup(service => service.GetBookingStatisticsAsync()).ReturnsAsync(stats);
        _fixture.SetUserInControllerContext(_controller, _fixture.AdminUser);

        // Act
        var result = await _controller.GetBookingStatistics();

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var returnValue = Assert.IsType<BookingStatisticsViewModel>(okResult.Value);
    }
}
