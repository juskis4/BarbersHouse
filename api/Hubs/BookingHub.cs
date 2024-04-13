using Microsoft.AspNetCore.SignalR;

namespace barbershouse.api.Hubs;

public class BookingHub : Hub
{
    public async Task SendMessage(string user, string message)
    {
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }

    
}