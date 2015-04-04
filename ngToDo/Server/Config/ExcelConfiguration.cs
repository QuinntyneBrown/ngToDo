using System.Configuration;

namespace ngToDo.Server.Config
{
    public class ExcelConfiguration: ConfigurationSection
    {
        [ConfigurationProperty("workbookFullPath", IsRequired = true)]
        public string WorkbookFullPath
        {
            get { return (string)this["workbookFullPath"]; }
            set { this["workbookFullPath"] = value; }
        }

        public static ExcelConfiguration Config
        {
            get { return ConfigurationManager.GetSection("excelConfiguration") as ExcelConfiguration; }
        }
    }
}