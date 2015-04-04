using System.Linq;
using System.Web.Http;
using ngToDo.Server.Data;
using ngToDo.Server.Data.MSExcel;
using ngToDo.Server.Models;

namespace ngToDo.Server.Api.v1
{
    public class ToDoController : ApiController
    {
        public ToDoController(IToDoRepository repository)
        {
            this.repository = repository;
        }

        [HttpGet]
        public IHttpActionResult GetAll()
        {
            using (repository)
            {
                return Ok(repository.GetAll());    
            }            
        }

        [HttpGet]
        public IHttpActionResult GetRecent()
        {
            using (repository)
            {
                return Ok(repository.GetAll().OrderByDescending(x => x.CreatedDateTime).Take(5));
            }
        }

        [HttpGet]
        public IHttpActionResult GetById(int id)
        {
            using (repository)
            {
                return Ok(repository.GetById(id));
            }
        }

        [HttpDelete]
        public IHttpActionResult Remove(int id)
        {
            using (repository)
            {
                repository.Delete(id);

                return Ok();
            }
        }

        [HttpPost]
        public IHttpActionResult Add(ToDo entity)
        {
            using (repository)
            {
                repository.Add(entity);

                return Ok();
            }
        }

        [HttpPut]
        public IHttpActionResult Update(ToDo entity)
        {
            using (repository)
            {
                repository.Update(entity);

                return Ok();
            }
        }

        private IToDoRepository repository { get; set; } 

    }
}
