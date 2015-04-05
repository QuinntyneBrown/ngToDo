using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace ngToDo.Server.Config
{
    public class CryptoConfiguration: ConfigurationSection
    {
        [ConfigurationProperty("sharedSecret", IsRequired = true)]
        public string SharedSecret
        {
            get { return (string)this["sharedSecret"]; }
            set { this["sharedSecret"] = value; }
        }

        public static CryptoConfiguration Config
        {
            get { return ConfigurationManager.GetSection("cryptoConfiguration") as CryptoConfiguration; }
        }
    }
}