using CommonDesk.Venue.EntityFrameworkCore;

namespace CommonDesk.Venue.Migrations.Seed.Host
{
    public class InitialHostDbBuilder
    {
        private readonly VenueDbContext _context;

        public InitialHostDbBuilder(VenueDbContext context)
        {
            _context = context;
        }

        public void Create()
        {
            new DefaultEditionCreator(_context).Create();
            new DefaultLanguagesCreator(_context).Create();
            new HostRoleAndUserCreator(_context).Create();
            new DefaultSettingsCreator(_context).Create();

            _context.SaveChanges();
        }
    }
}
