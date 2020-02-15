using Abp.Dependency;
using GraphQL;
using GraphQL.Types;
using CommonDesk.Venue.Queries.Container;

namespace CommonDesk.Venue.Schemas
{
    public class MainSchema : Schema, ITransientDependency
    {
        public MainSchema(IDependencyResolver resolver) :
            base(resolver)
        {
            Query = resolver.Resolve<QueryContainer>();
        }
    }
}