using System.Web.Http;
using System.Web.Http.Cors;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace ngToDo.Server.StartUp
{
    public static class WebApiStartUp
    {
        public static void Configure(HttpConfiguration config)
        {
            var jSettings = new JsonSerializerSettings();

            jSettings.Formatting = Formatting.Indented;
            jSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            config.Formatters.Remove(config.Formatters.XmlFormatter);
            config.Formatters.JsonFormatter.SerializerSettings = jSettings;

            config.EnableCors(new EnableCorsAttribute("*","*","*"));

            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
