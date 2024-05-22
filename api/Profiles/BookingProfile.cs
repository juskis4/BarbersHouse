using AutoMapper;
using barbershouse.api.Models;
using barbershouse.api.ViewModels;

namespace barbershouse.api.Profiles;

public class BookingProfile : Profile
{
    public BookingProfile()
    {
        CreateMap<Booking, AddBookingViewModel>()
            .ForMember(dest => dest.BarberId, opt => opt.MapFrom(src => src.BarberId))
            .ForMember(dest => dest.ServiceId, opt => opt.MapFrom(src => src.ServiceId))
            .ForMember(dest => dest.CustomerName, opt => opt.MapFrom(src => src.Customer.CustomerName))
            .ForMember(dest => dest.CustomerEmail, opt => opt.MapFrom(src => src.Customer.CustomerEmail))
            .ForMember(dest => dest.StartTime, opt => opt.MapFrom(src => src.BookingDateTime));

        CreateMap<AddBookingViewModel, Booking>()
            .ForMember(dest => dest.BookingDateTime, opt => opt.MapFrom(src => src.StartTime));

        CreateMap<Booking, GetBookingsViewModel>()
            .ForMember(dest => dest.BarberName, opt => opt.MapFrom(src => src.Barber.Name))
            .ForMember(dest => dest.CustomerName, opt => opt.MapFrom(src => src.Customer.CustomerName))
            .ForMember(dest => dest.ServiceTitle, opt => opt.MapFrom(src => src.Service.Title))
            .ForMember(dest => dest.Duration, opt => opt.MapFrom(src => src.Service.Duration));

        CreateMap<Booking, GetBookingDetailsViewModel>()
            .ForMember(dest => dest.Barber, opt => opt.MapFrom(src => src.Barber))
            .ForMember(dest => dest.Service, opt => opt.MapFrom(src => src.Service))
            .ForMember(dest => dest.CustomerName, opt => opt.MapFrom(src => src.Customer.CustomerName));
    }
}