using Microsoft.Practices.Unity;
using System.Web.Http;
using ngToDo.Server.Config;
using ngToDo.Server.Data;
using Unity.WebApi;

namespace ngToDo.Server.StartUp
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
            var container = GetContainer();
            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);            
        }

        public static UnityContainer GetContainer()
        {
            var container = new UnityContainer();

            if (AppConfiguration.Config.UseExcelDataSource)
                container.RegisterType<IToDoRepository, ngToDo.Server.Data.MSExcel.ToDoRepository>();                                
            
            if(AppConfiguration.Config.UseEFDataSource)
                container.RegisterType<IToDoRepository,ngToDo.Server.Data.EF.ToDoRepository>();

            container.RegisterType<ngToDo.Server.Data.EF.ToDoContext>();
            return container;
        }

    }
}