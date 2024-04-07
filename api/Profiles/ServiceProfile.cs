using AutoMapper;
using barbershouse.api.Models;
using barbershouse.api.ViewModels;

namespace barbershouse.api.Profiles;

public class ServiceProfile : Profile
{
    public ServiceProfile()
    {
        CreateMap<Service, ServiceViewModel>()
            .ForMember(dest => dest.ServiceId, opt => opt.MapFrom(src => src.ServiceID))
            .ForMember(dest => dest.BarberId, opt => opt.MapFrom(src => src.BarberId));
    }
}
