using System;
using System.Threading;

namespace CommonDesk.Venue.Web.Startup
{
    public abstract class RefindBaseTools 
    {
        public bool RetryWhileFalse(string cmdName, int cnt,int delay, Func<bool> cmd)
        {
            var ret = false;
            int c = 0;
            while(ret == false && c < cnt)
            {
                try
                {
                    c++;
                    ret = cmd();

                    if(ret == false) 
                    {
                        Thread.Sleep(delay);
                    }
                }
                catch (Exception error)
                {
                    Console.WriteLine($"RefindBaseTools:RetryWhileFalse:Command=[{cmdName}]:Timeout:Retrying:[{c+1}] of [{cnt}] times. Error=[{error.Message}]");                   
                    Thread.Sleep(delay);
                    ret = false;
                }
            }

            return ret;
        }
    }
}
