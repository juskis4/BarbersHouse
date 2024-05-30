using barbershouse.api.Models;
using barbershouse.api.ViewModels;
using System;
using System.Collections.Generic;

namespace barbershouse.api.Tests.Common.Factories
{
    public static class BookingFactory
    {
        public static Booking CreateBooking(
            int bookingId = 1,
            int customerId = 1,
            int barberId = 1,
            int serviceId = 1,
            DateTime? bookingDateTime = null,
            string status = "Confirmed")
        {
            return new Booking
            {
                BookingID = bookingId,
                CustomerId = customerId,
                BarberId = barberId,
                ServiceId = serviceId,
                BookingDateTime = bookingDateTime ?? DateTime.UtcNow,
                Status = status
            };
        }

        public static GetBookingDetailsViewModel CreateBookingDetailsViewModel(
            int bookingId = 1,
            int customerId = 1,
            string customerName = "Test Customer",
            string customerEmail = "test@example.com",
            BarberWithServicesViewModel barber = null,
            ServiceViewModel service = null,
            DateTimeOffset? bookingDateTime = null,
            string status = "Confirmed")
        {
            return new GetBookingDetailsViewModel
            {
                BookingId = bookingId,
                CustomerId = customerId,
                CustomerName = customerName,
                CustomerEmail = customerEmail,
                Barber = barber ?? new BarberWithServicesViewModel { BarberId = 1, Name = "Test Barber", Services = new List<ServiceViewModel>() },
                Service = service ?? new ServiceViewModel { ServiceId = 1, Title = "Test Service" },
                BookingDateTime = bookingDateTime ?? DateTimeOffset.UtcNow,
                Status = status
            };
        }

        public static AddBookingViewModel CreateAddBookingViewModel(
            int barberId = 1,
            string customerName = "Test Customer",
            string customerEmail = "test@example.com",
            int? serviceId = 1,
            int? duration = 30,
            DateTime? startTime = null)
        {
            return new AddBookingViewModel
            {
                BarberId = barberId,
                CustomerName = customerName,
                CustomerEmail = customerEmail,
                ServiceId = serviceId,
                Duration = duration,
                StartTime = startTime ?? DateTime.UtcNow.AddHours(1)
            };
        }

        public static GetBookingsViewModel CreateBookingViewModel(
            int bookingId = 1,
            int barberId = 1,
            string barberName = "Test Barber",
            int customerId = 1,
            string customerName = "Test Customer",
            string customerEmail = "test@example.com",
            int serviceId = 1,
            string serviceTitle = "Test Service",
            DateTimeOffset? bookingDateTime = null,
            string status = "Confirmed",
            int duration = 30)
        {
            return new GetBookingsViewModel
            {
                BookingId = bookingId,
                BarberId = barberId,
                BarberName = barberName,
                CustomerId = customerId,
                CustomerName = customerName,
                CustomerEmail = customerEmail,
                ServiceId = serviceId,
                ServiceTitle = serviceTitle,
                BookingDateTime = bookingDateTime ?? DateTimeOffset.UtcNow,
                Status = status,
                Duration = duration
            };
        }

        public static List<GetBookingsViewModel> CreateBookingsList(int count)
        {
            var bookings = new List<GetBookingsViewModel>();
            for (int i = 1; i <= count; i++)
            {
                bookings.Add(CreateBookingViewModel(bookingId: i));
            }
            return bookings;
        }
    }
}
