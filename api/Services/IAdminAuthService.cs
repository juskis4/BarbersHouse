using barbershouse.api.ViewModels;

namespace barbershouse.api.Services;

public interface IAdminAuthService
{
    Task<LoginResultViewModel> LoginAsync(LoginViewModel model);
    Task<RegistrationResultViewModel> RegisterAsync(RegisterAdminViewModel model);
}