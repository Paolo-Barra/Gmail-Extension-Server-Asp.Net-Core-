
using System;
using System.Threading;
using System.IO;
using ServiceStack.OrmLite;
using ServiceStack.OrmLite.MySql;
using Microsoft.Extensions.Configuration;

namespace CommonDesk.Venue.Web.Startup
{
    public class RefindDal : RefindBaseTools
    {
        protected OrmLiteConnectionFactory DbOrmConnectionFactory;
        protected string DbConnectionString;
        public IConfigurationRoot Configuration { get; set; }

        public RefindDal()
        {
            var builder = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: true, reloadOnChange: false);

            Configuration = builder.Build();

            DbConnectionString= Configuration["ConnectionStrings:Default"];
            Console.WriteLine($"RD:ConnectionString=[{DbConnectionString}]");
        }

        public void waitForDatabaseReady() 
        {
            Random rnd = new Random((int) DateTime.Now.Ticks);
            int delay = rnd.Next(0, 5000); 
            Console.WriteLine($"RD:Sleeping {delay}");
            Thread.Sleep(delay);
                        
            RetryWhileFalse("RD:TestOpenDb", 60, 5000, () =>
            {
                if (TestOpenDb() == true)
                {
                    Console.WriteLine($"RD:Database Created!");
                    return true;
                }
                else
                {
                    Console.WriteLine("Database not ready, sleeping");
                }
                
                return false;
            });

            Console.WriteLine("RD:Database is ready, starting app");
        }

        public void OpenConnection()
        {            
            //  MYSQL connectionString doc https://www.connectionstrings.com/mysql/
            Console.WriteLine($"RefindDal:OpenConnection:[{DbConnectionString}]");
            DbOrmConnectionFactory = DbOrmConnectionFactory ?? new OrmLiteConnectionFactory(DbConnectionString, MySqlDialect.Provider);
        }

        public bool TestOpenDb()
        {
            bool dbIsGood = false;
            OrmLiteConfig.CommandTimeout = 5;
            try
            {
                OpenConnection();
                using (var dbConnection = DbOrmConnectionFactory.Open())
                {
                    dbIsGood = dbConnection.TableExists("AbpRoleClaims");
                    
                }
            }
            catch (Exception)
            {
                dbIsGood = false;
            }
            return dbIsGood;
        }

        // public bool RetryWhileFalse(string cmdName, int cnt,int delay, Func<bool> cmd)
        // {
        //     var ret = false;
        //     int c = 0;
        //     while(ret == false && c < cnt)
        //     {
        //         try
        //         {
        //             c++;
        //             ret = cmd();

        //             if(ret == false) 
        //             {
        //                 Thread.Sleep(delay);
        //             }
        //         }
        //         catch (Exception error)
        //         {
        //             Console.WriteLine($"RD:RetryWhileFalse:Command=[{cmdName}]:Timeout:Retrying:[{c+1}] of [{cnt}] times. Error=[{error.Message}]");                   
        //             Thread.Sleep(delay);
        //             ret = false;
        //         }
        //     }

        //     return ret;
        // }
    }
}