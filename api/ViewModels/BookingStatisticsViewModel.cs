namespace barbershouse.api.ViewModels;

public class BookingStatisticsViewModel
{
    public int TotalBookingsCurrentMonth { get; set; }
    public decimal BookingPercentageChange { get; set; }
    public decimal? CurrentMonthRevenue { get; set; }
}
