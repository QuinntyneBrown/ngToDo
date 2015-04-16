using System.Web.Http;
using ngToDo.Server.Data;

namespace ngToDo.Server.Api.v1
{
    [Authorize]
    public class IdentityController : ApiController
    {
        public IdentityController(IUserRepository repository)
        {
            this.repository = repository;
        }

        [HttpGet]
        public IHttpActionResult GetCurrentUser()
        {
            using (repository)
            {
                return Ok(repository.GetByName(User.Identity.Name));    
            }            
        }

        protected IUserRepository repository;
    }
}
