using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace CommonDesk.Venue.EntityFrameworkCore
{
public static class VenueDbContextConfigurer
{
    public static void Configure(DbContextOptionsBuilder<VenueDbContext> builder, string connectionString)
    {
        builder.UseMySql(connectionString);
    }
 
    public static void Configure(DbContextOptionsBuilder<VenueDbContext> builder, DbConnection connection)
    {
        builder.UseMySql(connection);
    }
 }
}
