using System;
using System.Linq;
using System.Web.Http;
using Breeze.WebApi2;
using Breeze.ContextProvider.EF6;
using Breeze.ContextProvider;
using Newtonsoft.Json.Linq;
using ngToDo.Server.Data.EF;
using ngToDo.Server.Models;

namespace ngToDo.Server.Api.v1
{

    [BreezeController]
    public class BreezeDataServiceController : ApiController
    {
        readonly EFContextProvider<ToDoContext> _contextProvider =
            new EFContextProvider<ToDoContext>();

        public BreezeDataServiceController()
        {

        }

        [HttpGet]
        public string Metadata()
        {
            var toDoContext = new ToDoContext();

            return EFContextProvider<ToDoContext>.GetMetadataFromContext(toDoContext);

            return _contextProvider.Metadata();
        }

        [HttpGet]
        public IQueryable<ToDo> ToDos()
        {
            return _contextProvider.Context.ToDos.OrderBy(c => c.CompletedDateTime);
        }


        [HttpPost]
        public SaveResult SaveChanges(JObject saveBundle)
        {
            try
            {
                return _contextProvider.SaveChanges(saveBundle);
            }
            catch 
            {
                throw;
            }

        }
    }
}
