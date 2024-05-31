using Microsoft.AspNetCore.Mvc;
using barbershouse.api.Services;
using barbershouse.api.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using barbershouse.api.Models;

namespace barbershouse.api.Controllers;

[ApiController]
[Route("[controller]")]
public class BookingsController(IBookingService bookingService) : ControllerBase
{
    private readonly IBookingService _bookingService = bookingService;
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<GetBookingsViewModel>>> GetBookings(int? barberId = null, DateTimeOffset? startDate = null, DateTimeOffset? endDate = null)
    {
        try
        {
            var bookings = await _bookingService.GetBookingsAsync(barberId, startDate, endDate);
            return Ok(bookings);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
    
    [HttpGet("{bookingId}")] 
    [Authorize(Policy = "IsAdmin")]
    public async Task<ActionResult<GetBookingDetailsViewModel>> GetBookingById(int bookingId)
    {
        try
        {
            var booking = await _bookingService.GetBookingByIdAsync(bookingId);
            if (booking == null)
            {
                return NotFound(); 
            }

            return Ok(booking); 
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPost("{barberId}/bookings")]
    public async Task<IActionResult> AddBookingAsync([FromBody] AddBookingViewModel booking)
    {
        try
        {
            await _bookingService.AddBookingAsync(booking);
            // notify the hub that a booking has been made to remove the booked time slot
            //  await Clients.Caller.SendAsync("ReceiveBookingConfirmation");
            return Ok(); 
        }
        catch (ArgumentException ex) 
        {
            return BadRequest(ex.Message);
        }  
        catch (Exception ex) 
        {
            return StatusCode(500, $"Internal server error. {ex.Message}"); 
        }
    }

    [HttpPut("{barberId:int}/bookings/{bookingId:int}/cancel")]
    [Authorize(Policy = "IsAdmin")]
    public async Task<IActionResult> BookingCancel(int barberId, int bookingId)
    {
        try
        {
            await _bookingService.CancelBooking(barberId, bookingId);

            return Ok(); 
        }
        catch (ArgumentException ex) 
        {
            return BadRequest(ex.Message);
        }  
        catch (Exception ex) 
        {
            return StatusCode(500, $"Internal server error. {ex.Message}"); 
        }
    }

    [HttpPatch("{bookingId}")]
    [Authorize(Policy = "IsAdmin")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> UpdateBooking(int bookingId, [FromBody] JsonPatchDocument<Booking> patchDoc)
    {
        try
        {
            await _bookingService.UpdateBookingAsync(bookingId, patchDoc);
            return NoContent();
        }
        catch (ArgumentException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpGet("statistics")]
    [Authorize(Policy = "IsAdmin")]
    public async Task<ActionResult<BookingStatisticsViewModel>> GetBookingStatistics()
    {
        try
        {
            var stats = await _bookingService.GetBookingStatisticsAsync(); 
            return Ok(stats);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}