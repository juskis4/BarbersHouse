using Microsoft.AspNetCore.Mvc;
using barbershouse.api.Services;

namespace barbershouse.api.Controllers;

[ApiController]
[Route("[controller]")]
public class HomeController : ControllerBase
{
    private readonly HomeService _homeService;

    public HomeController(HomeService homeService)
    {
        _homeService = homeService;
    }

    [HttpGet("{id}", Name = "Get")]
    public string Get(int id)
    {
        return _homeService.GetById(id);
    }

}
