using System.Linq;
using System.Web.Http;
using System.Web.Http.OData;
using ngToDo.Server.Data;
using ngToDo.Server.Models;
using WebApi.OutputCache.V2;
using ngToDo.Server.Attributes;

namespace ngToDo.Server.Api.v1
{
    [Authorize]
    public class ToDoController : ApiController
    {
        public ToDoController(IRepository<ToDo> repository)
        {           
            this.repository = repository;
        }

        [HttpGet]
        [CacheOutput(ServerTimeSpan = 50)]
        public IHttpActionResult GetAll()
        {
            using (repository)
            {
                return Ok(repository.GetAll().Where(x => !x.IsDeleted && x.Username == User.Identity.Name).ToList());    
            }            
        }

        [HttpGet]
        [CacheOutput(ServerTimeSpan = 50)]
        public IHttpActionResult GetRecent()
        {            
            using (repository)
            {
                return Ok(repository.GetAll().Where(x => !x.IsDeleted && x.Username == User.Identity.Name).OrderByDescending(x => x.CreatedDateTime).Take(5).ToList());
            }
        }

        [HttpGet]
        [CacheOutput(ServerTimeSpan = 50)]
        public IHttpActionResult GetById(int id)
        {
            using (repository)
            {
                return Ok(repository.GetById(id));
            }
        }

        [HttpDelete]
        [InvalidateCacheOutput("Get")]
        [InvalidateCacheOutput("GetAll")]
        [InvalidateCacheOutput("GetById")]
        [InvalidateCacheOutput("GetRecent")]
        public IHttpActionResult Remove(int id)
        {
            using (repository)
            {
                var toDo = repository.GetById(id);
                toDo.IsDeleted = true;
                Update(toDo);
                return Ok();
            }
        }

        [HttpPost]
        [InvalidateCacheOutput("Get")]
        [InvalidateCacheOutput("GetAll")]
        [InvalidateCacheOutput("GetById")]
        [InvalidateCacheOutput("GetRecent")]
        [ValidateModelStateAttribute]
        public IHttpActionResult Add(ToDo entity)
        {
            using (repository)
            {
                entity.Username = User.Identity.Name;
                repository.Add(entity);
                repository.SaveChanges();
                return Ok(repository.GetById(entity.Id));
            }
        }

        [HttpPut]
        [InvalidateCacheOutput("Get")]
        [InvalidateCacheOutput("GetAll")]
        [InvalidateCacheOutput("GetById")]
        [InvalidateCacheOutput("GetRecent")]
        [ValidateModelStateAttribute]
        public IHttpActionResult Update(ToDo entity)
        {
            using (repository)
            {

                repository.Update(entity);
                repository.SaveChanges();
                return Ok(repository.GetById(entity.Id));
            }
        }

        [HttpGet]
        public IHttpActionResult GetModelState(ToDo toDo)
        {            
            return Ok(this.ModelState);
        }

        private IRepository<ToDo> repository { get; set; } 

    }
}
