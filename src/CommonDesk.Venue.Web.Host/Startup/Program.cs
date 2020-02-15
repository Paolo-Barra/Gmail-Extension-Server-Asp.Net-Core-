using System;
using System.IO;
using CommonDesk.Venue.Web.Host.Startup;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore;
using System.Net;

namespace CommonDesk.Venue.Web.Startup
{
    public class Program
    {
        public static void Main(string[] args)
        {
            foreach (var arg in args)
            {
                Console.WriteLine($"Arg=[{arg}]");
            }

            if(args.Length > 0 && args[0] == "-i")
            {
                CreateBuilderForDbInit(args).Build().Run();
            }
            else
            {
                // If we have the -w flag then we need to wait until the db is ready
                if(args.Length > 0 && args[0] == "-w"){
                    var refindDal = new RefindDal();
                    refindDal.waitForDatabaseReady();
                }

                // Now that the db is fully created we can start the app
                CreateWebHostBuilder(args).Build().Run();
            }            
        }
        public static IWebHostBuilder CreateWebHostBuilder(string[] args)
        {
            Console.WriteLine("CreateWebHostBuilder");
            //return new WebHostBuilder()
            return WebHost.CreateDefaultBuilder()
                .UseKestrel((builderContext, opt) => {
                    opt.AddServerHeader = false;                    
                    //opt.Configure(builderContext.Configuration.GetSection("Kestrel"));
                })
                .UseContentRoot(Directory.GetCurrentDirectory())
                //.UseIISIntegration()
                //.UseUrls("http://0.0.0.0:4200")
                .UseStartup<ReFindStartup>();
        }

        public static IWebHostBuilder CreateBuilderForDbInit(string[] args)
        {
            Console.WriteLine("CreateBuilderForDbInit");
            return new WebHostBuilder()
                .UseKestrel((builderContext, opt) => {
                    opt.AddServerHeader = false;
                    //opt.Configure(builderContext.Configuration.GetSection("Kestrel"));
                })
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseStartup<RefindInitDb>();
                
        }

        
    }
}
