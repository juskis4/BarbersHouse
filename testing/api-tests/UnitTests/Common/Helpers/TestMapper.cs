using AutoMapper;
using barbershouse.api.Profiles;

namespace barbershouse.api.Tests.Common.Helpers 
{
    public static class TestMapper
    {
        public static IMapper CreateMapper()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddMaps(typeof(BarberProfile).Assembly); 
            });

            return config.CreateMapper();
        }
    }
}
