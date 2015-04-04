using System.Configuration;

namespace ngToDo.Server.Config
{
    public class AppConfiguration: ConfigurationSection
    {
        [ConfigurationProperty("useExcelDataSource", IsRequired = true)]
        public bool UseExcelDataSource
        {
            get { return (bool)this["useExcelDataSource"]; }
            set { this["useExcelDataSource"] = value; }
        }

        [ConfigurationProperty("useEFDataSource", IsRequired = true)]
        public bool UseEFDataSource
        {
            get { return (bool)this["useEFDataSource"]; }
            set { this["useEFDataSource"] = value; }
        }

        public static AppConfiguration Config
        {
            get { return ConfigurationManager.GetSection("appConfiguration") as AppConfiguration; }
        }
    }
}