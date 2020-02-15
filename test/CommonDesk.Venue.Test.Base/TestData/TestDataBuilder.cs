using CommonDesk.Venue.EntityFrameworkCore;

namespace CommonDesk.Venue.Test.Base.TestData
{
    public class TestDataBuilder
    {
        private readonly VenueDbContext _context;
        private readonly int _tenantId;

        public TestDataBuilder(VenueDbContext context, int tenantId)
        {
            _context = context;
            _tenantId = tenantId;
        }

        public void Create()
        {
            new TestOrganizationUnitsBuilder(_context, _tenantId).Create();
            new TestSubscriptionPaymentBuilder(_context, _tenantId).Create();
            new TestEditionsBuilder(_context).Create();

            _context.SaveChanges();
        }
    }
}
