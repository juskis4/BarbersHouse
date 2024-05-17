using AutoMapper;
using barbershouse.api.Models;
using barbershouse.api.ViewModels;

namespace barbershouse.api.Profiles;

public class BarberProfile : Profile
{
    public BarberProfile()
    {
        CreateMap<Barber, BarberViewModel>()
            .ForMember(dest => dest.BarberId, opt => opt.MapFrom(src => src.BarberID))
            .ForMember(dest => dest.Services, opt => opt.MapFrom(src => src.Services));

        CreateMap<Barber, BarberResultViewModel>()
        .ForMember(dest => dest.BarberId, opt => opt.MapFrom(src => src.BarberID))
        .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
        .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
        .ForMember(dest => dest.Bio, opt => opt.MapFrom(src => src.Bio))
        .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.PhotoUrl));
    }
}
