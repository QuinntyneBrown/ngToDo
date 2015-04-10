using System.Threading.Tasks;
using System.Web.Http;
using ngToDo.Server.Data;

namespace ngToDo.Server.Api.v1
{
    public class IdentityController : ApiController
    {
        public IdentityController()
        {
            
        }

        [Authorize]
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
