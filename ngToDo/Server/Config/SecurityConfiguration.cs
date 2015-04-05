using System.Configuration;

namespace ngToDo.Server.Config
{
    public class SecurityConfiguration: ConfigurationSection
    {
        [ConfigurationProperty("storePasswordsInPlainText", IsRequired = true)]
        public bool StorePasswordsInPlainText
        {
            get { return (bool)this["storePasswordsInPlainText"]; }
            set { this["storePasswordsInPlainText"] = value; }
        }

        [ConfigurationProperty("tokenPath", IsRequired = true)]
        public string TokenPath
        {
            get { return (string)this["tokenPath"]; }
            set { this["tokenPath"] = value; }
        }

        [ConfigurationProperty("expirationMinutes", IsRequired = true)]
        public int ExpirationMinutes
        {
            get { return (int)this["expirationMinutes"]; }
            set { this["expirationMinutes"] = value; }
        }

        [ConfigurationProperty("jwtKey")]
        public string JwtKey
        {
            get { return (string)this["jwtKey"]; }
            set { this["jwtKey"] = value; }
        }

        [ConfigurationProperty("jwtIssuer")]
        public string JwtIssuer
        {
            get { return (string)this["jwtIssuer"]; }
            set { this["jwtIssuer"] = value; }
        }

        [ConfigurationProperty("jwtAudience")]
        public string JwtAudience
        {
            get { return (string)this["jwtAudience"]; }
            set { this["jwtAudience"] = value; }
        }


        public static SecurityConfiguration Config
        {
            get { return ConfigurationManager.GetSection("securityConfiguration") as SecurityConfiguration; }
        }
    }
}