using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CommonDesk.Venue.MultiTenancy.HostDashboard.Dto;

namespace CommonDesk.Venue.MultiTenancy.HostDashboard
{
    public interface IIncomeStatisticsService
    {
        Task<List<IncomeStastistic>> GetIncomeStatisticsData(DateTime startDate, DateTime endDate,
            ChartDateInterval dateInterval);
    }
}