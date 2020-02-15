using System;
using System.Collections.Generic;

namespace CommonDesk.Venue.Sessions.Dto
{
    public class ApplicationInfoDto
    {
        public string Version { get; set; }

        public DateTime ReleaseDate { get; set; }

        public string Currency { get; set; }

        public string CurrencySign { get; set; }

        public bool AllowTenantsToChangeEmailSettings { get; set; }

        public Dictionary<string, bool> Features { get; set; }

        // COMMONDESK
        public string GitInfo { get; set; }
        public string GitBranch {get;set;}
        public string GitCommit {get;set;}
        public string GitRoot {get;set;}
    }
}