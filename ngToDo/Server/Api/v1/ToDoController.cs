using System;
using System.Linq;
using System.Web.Http;
using ngToDo.Server.Data;
using ngToDo.Server.Models;
using System.Diagnostics.Contracts;

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
        public IHttpActionResult GetAll()
        {
            using (repository)
            {
                return Ok(repository.GetAll().Where(x => !x.IsDeleted && x.Username == User.Identity.Name).ToList());    
            }            
        }

        [HttpGet]
        public IHttpActionResult GetRecent()
        {            
            using (repository)
            {
                return Ok(repository.GetAll().Where(x => !x.IsDeleted && x.Username == User.Identity.Name).OrderByDescending(x => x.CreatedDateTime).Take(5).ToList());
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
                var toDo = repository.GetById(id);
                toDo.IsDeleted = true;
                Update(toDo);
                return Ok();
            }
        }

        [HttpPost]
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
        public IHttpActionResult Update(ToDo entity)
        {
            using (repository)
            {
                repository.Update(entity);
                repository.SaveChanges();
                return Ok(repository.GetById(entity.Id));
            }
        }

        private IRepository<ToDo> repository { get; set; } 

    }
}
