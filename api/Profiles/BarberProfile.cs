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
    }
}
