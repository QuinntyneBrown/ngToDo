using Microsoft.Practices.Unity;
using System.Web.Http;
using ngToDo.Server.Config;
using ngToDo.Server.Data;
using ngToDo.Server.Models;
using ngToDo.Server.Services;
using ngToDo.Server.Services.Contracts;
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
            {
                container.RegisterType<IRepository<ToDo>, ngToDo.Server.Data.MSExcel.ToDoRepository>();
                container.RegisterType<IUserRepository, ngToDo.Server.Data.MSExcel.UserRepository>();

            }

            if (AppConfiguration.Config.UseEFDataSource)
            {
                container.RegisterType<IRepository<ToDo>, ngToDo.Server.Data.EF.EFRepository<ToDo>>();
                container.RegisterType<IUserRepository, ngToDo.Server.Data.EF.UserRepository>();
            }
                

            container.RegisterType<ngToDo.Server.Data.EF.ToDoContext>();
            container.RegisterType<IIdentityService, IdentityService>();
            container.RegisterType<IEncryptionService, EncryptionService>();

            return container;
        }

    }
}