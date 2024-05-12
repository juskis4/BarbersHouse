using AutoMapper;
using barbershouse.api.ViewModels;
using barbershouse.api.Models;

namespace barbershouse.api.Profiles;

public class BarberWorkHoursProfile : Profile
{
    public BarberWorkHoursProfile()
    {
        CreateMap<AddBarberWorkHoursViewModel, BarberWorkHours>()
            .ForMember(dest => dest.BarberId, opt => opt.Ignore()) 
            .ForMember(dest => dest.WorkHourID, opt => opt.Ignore());    
    }
}