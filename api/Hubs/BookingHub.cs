using barbershouse.api.Services;
using barbershouse.api.ViewModels;
using Microsoft.AspNetCore.SignalR;

namespace barbershouse.api.Hubs;

public class BookingHub(IBarbersService barbersService, IBookingService bookingService, IServicesService servicesService) : Hub
{
    private readonly IBarbersService _barbersService = barbersService;
    private readonly IBookingService _bookingService = bookingService;
    private readonly IServicesService _servicesService = servicesService;

    public async Task SendMessage(string user, string message)
    {
        var request = new AvailableTimeSlotRequestViewModel
        {
            SelectedDate = new DateTime(2024, 05, 16),
            SelectedBarberId = 1,
            SelectedServiceIds = [1]
        };
        await GetAvailableTimeSlots(request);
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }

    public async Task<List<AvailableTimeSlotViewModel>> GetAvailableTimeSlots(AvailableTimeSlotRequestViewModel request)
    {
        // workHours contains IEnumerable of BarberWorkHours
        var workHours = await _barbersService.GetWorkHoursByBarberIdAndDayOfWeekAsync(request.SelectedBarberId, request.SelectedDate.DayOfWeek);

        // Calculate duration
        var totalServiceDuration = await _servicesService.GetTotalDurationForServicesAsync(request.SelectedServiceIds);
        var serviceDuration = TimeSpan.FromMinutes(totalServiceDuration);

        // Get existing appointments for the barber
        var appointments = await _bookingService.GetBookingsForBarberByDateAsync(request.SelectedBarberId, request.SelectedDate);
        if (appointments.Any() != false)
        {
            // Create Time Intervals (including those created by bookings)
            var intervals = new List<AvailableTimeSlotViewModel>();
            var currentStart = new DateTimeOffset(request.SelectedDate.Date.Year, request.SelectedDate.Date.Month, request.SelectedDate.Date.Day, workHours.StartTime.Hours, workHours.StartTime.Minutes, workHours.StartTime.Seconds, new TimeSpan());
            foreach (var booking in appointments)
            {
                if (booking.BookingDateTime > currentStart)
                {
                    intervals.Add(new AvailableTimeSlotViewModel { StartTime = currentStart, EndTime = booking.BookingDateTime });
                }
                currentStart = booking.BookingDateTime.AddMinutes(booking.Service.Duration); // Move start to after the booking
            }

            var endTime = new DateTimeOffset(request.SelectedDate.Date.Year, request.SelectedDate.Date.Month, request.SelectedDate.Date.Day, workHours.EndTime.Hours, workHours.EndTime.Minutes, workHours.EndTime.Seconds, new TimeSpan());
            // Add interval after the last booking until the end of the work day
            if (currentStart < endTime)
            {
                intervals.Add(new AvailableTimeSlotViewModel { StartTime = currentStart, EndTime = endTime });
            }

            var slots = new List<AvailableTimeSlotViewModel>();
            foreach (var interval in intervals)
            {
                var currentTime = interval.StartTime;
                while (currentTime.DateTime < interval.EndTime.DateTime)
                {
                    slots.Add(new AvailableTimeSlotViewModel
                    {
                        StartTime = currentTime,
                        EndTime = currentTime + serviceDuration
                    });
                    currentTime += serviceDuration;
                }
            }

            return slots;
        }
        else
        {
            // No appointments that day
            var slots = new List<AvailableTimeSlotViewModel>();
            var currentTime = new DateTimeOffset(request.SelectedDate.Date.Year, request.SelectedDate.Date.Month, request.SelectedDate.Date.Day, workHours.StartTime.Hours, workHours.StartTime.Minutes, workHours.StartTime.Seconds, new TimeSpan());
            var endTime = new DateTimeOffset(request.SelectedDate.Date.Year, request.SelectedDate.Date.Month, request.SelectedDate.Date.Day, workHours.EndTime.Hours, workHours.EndTime.Minutes, workHours.EndTime.Seconds, new TimeSpan());

            while (currentTime.DateTime < endTime.DateTime)
            {
                slots.Add(new AvailableTimeSlotViewModel
                {
                    StartTime = currentTime,
                    EndTime = currentTime + serviceDuration
                });
                currentTime += serviceDuration;
            }

            return slots;
        }
    }
}