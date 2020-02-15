using CommonDesk.Venue.Auditing;
using CommonDesk.Venue.Test.Base;
using Shouldly;
using Xunit;

namespace CommonDesk.Venue.Tests.Auditing
{
    // ReSharper disable once InconsistentNaming
    public class NamespaceStripper_Tests: AppTestBase
    {
        private readonly INamespaceStripper _namespaceStripper;

        public NamespaceStripper_Tests()
        {
            _namespaceStripper = Resolve<INamespaceStripper>();
        }

        [Fact]
        public void Should_Stripe_Namespace()
        {
            var controllerName = _namespaceStripper.StripNameSpace("CommonDesk.Venue.Web.Controllers.HomeController");
            controllerName.ShouldBe("HomeController");
        }

        [Theory]
        [InlineData("CommonDesk.Venue.Auditing.GenericEntityService`1[[CommonDesk.Venue.Storage.BinaryObject, CommonDesk.Venue.Core, Version=1.10.1.0, Culture=neutral, PublicKeyToken=null]]", "GenericEntityService<BinaryObject>")]
        [InlineData("CompanyName.ProductName.Services.Base.EntityService`6[[CompanyName.ProductName.Entity.Book, CompanyName.ProductName.Core, Version=1.10.1.0, Culture=neutral, PublicKeyToken=null],[CompanyName.ProductName.Services.Dto.Book.CreateInput, N...", "EntityService<Book, CreateInput>")]
        [InlineData("CommonDesk.Venue.Auditing.XEntityService`1[CommonDesk.Venue.Auditing.AService`5[[CommonDesk.Venue.Storage.BinaryObject, CommonDesk.Venue.Core, Version=1.10.1.0, Culture=neutral, PublicKeyToken=null],[CommonDesk.Venue.Storage.TestObject, CommonDesk.Venue.Core, Version=1.10.1.0, Culture=neutral, PublicKeyToken=null],]]", "XEntityService<AService<BinaryObject, TestObject>>")]
        public void Should_Stripe_Generic_Namespace(string serviceName, string result)
        {
            var genericServiceName = _namespaceStripper.StripNameSpace(serviceName);
            genericServiceName.ShouldBe(result);
        }
    }
}
