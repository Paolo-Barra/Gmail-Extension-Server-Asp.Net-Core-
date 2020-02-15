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

namespace CommonDesk.Venue.Web.Host.Startup
{
    public class ReFindStartup //: CommonDesk.Venue.Web.Startup.Startup
    {

        protected const string DefaultCorsPolicyName = "localhost";

        protected readonly IConfigurationRoot _appConfiguration;
        protected readonly IHostingEnvironment _hostingEnvironment;

        public ReFindStartup(IHostingEnvironment env) // : base(env)
        {
            System.Console.WriteLine("Startup:Startup");
            _hostingEnvironment = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        private void SetCors(IServiceCollection services)
        {
            // COMMONDESK
            // https://docs.microsoft.com/en-us/aspnet/core/security/cors?view=aspnetcore-2.2
            // UseCors must be called before UseMvc.
            // The URL must not contain a trailing slash(/). If the URL terminates with /, the comparison returns false and no header is returned.

            var origins = _appConfiguration["App:CorsOrigins"];
            if (origins == "*")
            {
                var x = services.AddCors(options =>
                {
                    string[] localOrigList =
                    {
                        "http://localhost:4200"  ,"http://localhost:5172", "http://localhost:22742"
                    };

                    options.AddPolicy(DefaultCorsPolicyName, builder =>
                    {
                        builder
                            .WithOrigins(localOrigList)
                            .SetIsOriginAllowedToAllowWildcardSubdomains()
                            //.AllowAnyOrigin()
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowCredentials();
                    });
                });
            }
            else
            {
                var olist = origins.Split(",", StringSplitOptions.RemoveEmptyEntries).Select(o => o.RemovePostFix("/")).ToArray();
                services.AddCors(options =>
                {
                    options.AddPolicy(DefaultCorsPolicyName, builder =>
                    {
                        builder
                            .WithOrigins(olist)
                            .AllowCredentials()
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });
                });
            }
        }
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            IdentityModelEventSource.ShowPII = true; 

            Console.WriteLine("ReFind Inc (C) -- www.refind.email");            
            // GitInfo - https://github.com/kzu/GitInfo -http://www.cazzulino.com/git-info-from-msbuild-and-code.html
            Console.WriteLine($"Startup:Git:Branch={ThisAssembly.Git.Branch}:Commit={ThisAssembly.Git.Commit}:Root={ThisAssembly.Git.Sha}:Sha={ThisAssembly.Git.Sha}");
            
            //System.Console.WriteLine($"Startup:Config File=[{AppDomain.CurrentDomain.SetupInformation.ConfigurationFile}]");

            #if DEBUG 
                Console.WriteLine("Startup:Built For DEBUG");
            #else
                Console.WriteLine("Startup:Built For RELEASE");
            #endif 
            
            var aspenv = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            Console.WriteLine("Startup:ASPNETCORE_ENVIRONMENT="+aspenv);
            if(aspenv == null) 
            {
                #if DEBUG
                    // allows kestral build to work in production
                    Console.WriteLine("Incorrect Launch profile specified. Exiting");
                    Environment.Exit(1);
                #endif 
            }
            Console.WriteLine("appconfig="+_appConfiguration == null);

            var cfg = _appConfiguration["ConnectionStrings:Default"];
            Console.WriteLine("Startup:ConnectionStrings:Default="+cfg);

            // COMMONDESK: MySql configuration
            services.AddDbContext<VenueDbContext>(options =>
            {
                options.UseMySql(cfg);
            });
            Console.WriteLine("Startup:Configured SQL");
            // COMMONDESK
            SetCors(services);      // must be called before AddMvc
            //MVC
            services.AddMvc(options =>
            {
                options.Filters.Add(new CorsAuthorizationFilterFactory(DefaultCorsPolicyName));
            }).SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            Console.WriteLine("Startup:Configured Mvc");

            services.AddSignalR(options =>
            {
                options.EnableDetailedErrors = true;
            });
            Console.WriteLine("Startup:Configured SignalR");

            IdentityRegistrar.Register(services);
            AuthConfigurer.Configure(services, _appConfiguration);
          

            //Identity server
            if (bool.Parse(_appConfiguration["IdentityServer:IsEnabled"]))
            {
                IdentityServerRegistrar.Register(services, _appConfiguration);
            }
            Console.WriteLine("Startup:Configured Identify");

            //Swagger - Enable this line and the related lines in Configure method to enable swagger UI
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new Info { Title = "Venue API", Version = "v1" });
                options.DocInclusionPredicate((docName, description) => true);
                options.UseReferencedDefinitionsForEnums();
                options.ParameterFilter<SwaggerEnumParameterFilter>();
                options.SchemaFilter<SwaggerEnumSchemaFilter>();

                //Note: This is just for showing Authorize button on the UI. 
                //Authorize button's behaviour is handled in wwwroot/swagger/ui/index.html
                options.AddSecurityDefinition("Bearer", new BasicAuthScheme());
            });
            Console.WriteLine("Startup:Configured Swagger");
            //Recaptcha
            // COMMONDESK
            if (bool.Parse(_appConfiguration["Recaptcha:IsEnabled"]))
            {
                services.AddRecaptcha(new RecaptchaOptions
                {
                    SiteKey = _appConfiguration["Recaptcha:SiteKey"],
                    SecretKey = _appConfiguration["Recaptcha:SecretKey"]
                });
            }

            //Hangfire (Enable to use Hangfire instead of default job manager)
            //services.AddHangfire(config =>
            //{
            //    config.UseSqlServerStorage(_appConfiguration.GetConnectionString("Default"));
            //});

            //Configure Abp and Dependency Injection
            var abbRet =  services.AddAbp<VenueWebHostModule>(options =>
            {
                //Configure Log4Net logging
                options.IocManager.IocContainer.AddFacility<LoggingFacility>(
                    f => f.UseAbpLog4Net().WithConfig("log4net.config")
                );

                options.PlugInSources.AddFolder(Path.Combine(_hostingEnvironment.WebRootPath, "Plugins"), SearchOption.AllDirectories);
            });
            Console.WriteLine("Startup:Configured AddAbp");
            return abbRet;
        }

        public void  Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            //Initializes ABP framework.
            app.UseAbp(options =>
            {
                options.UseAbpRequestLocalization = false; //used below: UseAbpRequestLocalization
            });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseStatusCodePagesWithRedirects("~/Error?statusCode={0}");
                app.UseExceptionHandler("/Error");
            }

            app.UseCors(DefaultCorsPolicyName); //Enable CORS!

            app.UseAuthentication();
            app.UseJwtTokenMiddleware();

            if (bool.Parse(_appConfiguration["IdentityServer:IsEnabled"]))
            {
                app.UseJwtTokenMiddleware("IdentityBearer");
                app.UseIdentityServer();
            }

            app.Use(
                async (context, next) =>
                                {      
                                    // COMMONDESK Remove the X-Frame-Options header to allow embedding on chrome extension
                                    if (context.Response.Headers.ContainsKey("X-Frame-Options"))
                                    {
                                        context.Response.Headers.Remove("X-Frame-Options");
                                    }
                                                  
                                    await next();
                                    if (context.Response.StatusCode == 404 && !Path.HasExtension(context.Request.Path.Value))                    
                                    {                        
                                        context.Request.Path = "/index.html";                        
                                        await next();                    
                                    }                
                                });
            app.UseStaticFiles();

            using (var scope = app.ApplicationServices.CreateScope())
            {
                if (scope.ServiceProvider.GetService<DatabaseCheckHelper>().Exist(_appConfiguration["ConnectionStrings:Default"]))
                {
                    app.UseAbpRequestLocalization();
                }
            }

            app.UseSignalR(routes =>
            {
                routes.MapHub<AbpCommonHub>("/signalr");
                routes.MapHub<ChatHub>("/signalr-chat");
            });

            if (WebConsts.HangfireDashboardEnabled)
            {
                //Hangfire dashboard &server(Enable to use Hangfire instead of default job manager)
                app.UseHangfireDashboard(WebConsts.HangfireDashboardEndPoint, new DashboardOptions
                {
                    Authorization = new[] { new AbpHangfireAuthorizationFilter(AppPermissions.Pages_Administration_HangfireDashboard) }
                });
                app.UseHangfireServer();
            }

            if (bool.Parse(_appConfiguration["Payment:Stripe:IsActive"]))
            {
                StripeConfiguration.SetApiKey(_appConfiguration["Payment:Stripe:SecretKey"]);
            }

            if (WebConsts.GraphQL.Enabled)
            {
                app.UseGraphQL<MainSchema>();
                if (WebConsts.GraphQL.PlaygroundEnabled)
                {
                    app.UseGraphQLPlayground(
                        new GraphQLPlaygroundOptions()); //to explorer API navigate https://*DOMAIN*/ui/playground
                }
            }

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "defaultWithArea",
                    template: "{area}/{controller=Home}/{action=Index}/{id?}");

                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });

            if (WebConsts.SwaggerUiEnabled)
                
                
                
            {
                // Enable middleware to serve generated Swagger as a JSON endpoint
                app.UseSwagger();
                // Enable middleware to serve swagger-ui assets (HTML, JS, CSS etc.)

                app.UseSwaggerUI(options =>
                {
                    options.SwaggerEndpoint(_appConfiguration["App:SwaggerEndPoint"], "Venue API V1");
                    options.IndexStream = () => Assembly.GetExecutingAssembly()
                        .GetManifestResourceStream("CommonDesk.Venue.Web.wwwroot.swagger.ui.index.html");
                    options.InjectBaseUrl(_appConfiguration["App:ServerRootAddress"]);
                }); //URL: /swagger
            }
        }


    }
}
