using Microsoft.AspNetCore.Mvc;
using barbershouse.api.Services;
using barbershouse.api.ViewModels;

namespace barbershouse.api.Controllers;

[ApiController]
[Route("[controller]")]
public class BookingsController(IBookingService bookingService) : ControllerBase
{
    private readonly IBookingService _bookingService = bookingService;
    

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

    [HttpPut("{barberId:int}/bookings/{bookingId:int}")]
    public async Task<IActionResult> BookingConfirmation(int barberId, int bookingId)
    {
        try
        {
            await _bookingService.ConfirmBooking(barberId, bookingId);

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
}