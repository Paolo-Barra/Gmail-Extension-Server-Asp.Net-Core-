using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using System.IO;
using System.Linq;
using System.Reflection;
using Abp.AspNetCore;
using Abp.AspNetCore.SignalR.Hubs;
using Abp.AspNetZeroCore.Web.Authentication.JwtBearer;
using Abp.Castle.Logging.Log4Net;
using Abp.Extensions;
using Abp.Hangfire;
using Abp.PlugIns;
using Castle.Facilities.Logging;
using Hangfire;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Cors.Internal;
using Microsoft.Extensions.Configuration;
using CommonDesk.Venue.Authorization;
using CommonDesk.Venue.Configuration;
using CommonDesk.Venue.EntityFrameworkCore;
using CommonDesk.Venue.Identity;
using CommonDesk.Venue.Web.Chat.SignalR;
using PaulMiami.AspNetCore.Mvc.Recaptcha;
using Swashbuckle.AspNetCore.Swagger;
using CommonDesk.Venue.Web.IdentityServer;
using CommonDesk.Venue.Web.Swagger;
using Microsoft.EntityFrameworkCore;
using Stripe;
using ILoggerFactory = Microsoft.Extensions.Logging.ILoggerFactory;
using CommonDesk.Venue.Web.Startup;
using CommonDesk.Venue.Web.Common;
using GraphQL.Server;
using CommonDesk.Venue.Schemas;
using GraphQL.Server.Ui.Playground;
using Microsoft.AspNetCore.Authentication;
using Microsoft.IdentityModel.Logging;

namespace CommonDesk.Venue.Web.Startup
{
    public class RefindInitDb : RefindBaseTools
    {
        protected readonly IConfigurationRoot _appConfiguration;
        protected readonly IHostingEnvironment _hostingEnvironment;

        public RefindInitDb(IHostingEnvironment env) // : base(env)
        {
            System.Console.WriteLine("RefindInitDb:RefindInitDb");
            _hostingEnvironment = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            var aspenv = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            Console.WriteLine("Startup:ASPNETCORE_ENVIRONMENT=" + aspenv);
            if (aspenv == null)
            {
#if DEBUG
                    // allows kestral build to work in production
                    Console.WriteLine("Incorrect Launch profile specified. Exiting");
                    Environment.Exit(1);
#endif
            }
            Console.WriteLine("appconfig=" + _appConfiguration == null);

            var cfg = _appConfiguration["ConnectionStrings:Default"];
            Console.WriteLine("Startup:ConnectionStrings:Default=" + cfg);

            // COMMONDESK: MySql configuration
            services.AddDbContext<VenueDbContext>(options =>
            {
                options.UseMySql(cfg);
            });
            Console.WriteLine("Startup:Configured SQL");

            var abbRet = services.AddAbp<VenueWebHostModule>(options => { });
            Console.WriteLine("Startup:Configured AddAbp");

            return abbRet;
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, IApplicationLifetime lifetime)
        {
            try
            {
                lifetime.ApplicationStarted.Register(OnAppStarted);
                lifetime.ApplicationStopping.Register(OnAppStopping);
                lifetime.ApplicationStopped.Register(OnAppStopped);

                RetryWhileFalse("RefindInitDb:RefindInitDb", 60, 5000, () =>
                {                    
                    using (var serviceScope = app.ApplicationServices
                        .GetRequiredService<IServiceScopeFactory>()
                        .CreateScope())
                    {
                        using (var context = serviceScope.ServiceProvider.GetService<VenueDbContext>())
                        {
                            Console.WriteLine("RefindInitDb:Configure:Creating portal database");
                            context.Database.Migrate();
                            Console.WriteLine("RefindInitDb:Configure:Portal database created");

                            return true;
                        }                     
                    }
                });

                lifetime.StopApplication();
            }
            catch (Exception e)
            {
                Console.WriteLine($"RefindInitDb:Configure:Error creating portal database:[{e.Message}]");
            }
        }

        public void OnAppStarted()
        {
            Console.WriteLine("RefindInitDb:OnAppStarted");
        }
        public void OnAppStopping()
        {
            Console.WriteLine("RefindInitDb:OnAppStopping");
        }
        public void OnAppStopped()
        {
            Console.WriteLine("RefindInitDb:OnAppStopped");
        }
    }
}
