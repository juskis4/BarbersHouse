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
            .ForMember(dest => dest.CustomerId, opt => opt.MapFrom(src => src.CustomerId))
            .ForMember(dest => dest.StartTime, opt => opt.MapFrom(src => src.BookingDateTime));

        CreateMap<AddBookingViewModel, Booking>()
            .ForMember(dest => dest.BookingDateTime, opt => opt.MapFrom(src => src.StartTime)); 
    }
}