using System.Linq;
using System.Web.Http;
using Breeze.WebApi2;
using Breeze.ContextProvider.EF6;
using Breeze.ContextProvider;
using ngToDo.Server.Data.EF;
using ngToDo.Server.Models;

namespace ngToDo.Server.Api
{
    [Authorize]
    [BreezeController]
    public class BreezeDataServiceController : ApiController
    {
        readonly EFContextProvider<ToDoContext> _contextProvider =
            new EFContextProvider<ToDoContext>();

        public BreezeDataServiceController()
        {
            //System.Threading.Thread.Sleep(5000); 
        }

        [HttpGet]
        public string Metadata()
        {
            return _contextProvider.Metadata();
        }

        [HttpGet]
        public IQueryable<ToDo> ToDos()
        {
            return _contextProvider.Context.ToDos.OrderBy(c => c.CompletedDateTime);
        }
    }
}
