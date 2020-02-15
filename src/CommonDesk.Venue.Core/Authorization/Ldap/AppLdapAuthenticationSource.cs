using Abp.Zero.Ldap.Authentication;
using Abp.Zero.Ldap.Configuration;
using CommonDesk.Venue.Authorization.Users;
using CommonDesk.Venue.MultiTenancy;

namespace CommonDesk.Venue.Authorization.Ldap
{
    public class AppLdapAuthenticationSource : LdapAuthenticationSource<Tenant, User>
    {
        public AppLdapAuthenticationSource(ILdapSettings settings, IAbpZeroLdapModuleConfig ldapModuleConfig)
            : base(settings, ldapModuleConfig)
        {
        }
    }
}