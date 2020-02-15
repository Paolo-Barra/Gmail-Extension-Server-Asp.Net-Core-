using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using CommonDesk.Venue.Configuration;
using CommonDesk.Venue.Web;

namespace CommonDesk.Venue.EntityFrameworkCore
{
    /* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
    public class VenueDbContextFactory : IDesignTimeDbContextFactory<VenueDbContext>
    {
        public VenueDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<VenueDbContext>();
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder(), addUserSecrets: true);

            VenueDbContextConfigurer.Configure(builder, configuration.GetConnectionString(VenueConsts.ConnectionStringName));

            return new VenueDbContext(builder.Options);
        }
    }
}