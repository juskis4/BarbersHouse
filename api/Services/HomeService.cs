using System.Collections.Generic;

namespace barbershouse.api.Services;

public class HomeService
{
    private readonly Dictionary<int, string> data = new Dictionary<int, string>
        {
            { 1, "value1" },
            { 2, "value2" },
            { 3, "value3" }
        };

    public string GetById(int id)
    {
        data.TryGetValue(id, out string value);
        return value;
    }
}
