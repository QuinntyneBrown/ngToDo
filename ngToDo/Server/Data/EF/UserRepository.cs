

using System.Linq;
using ngToDo.Server.Models;

namespace ngToDo.Server.Data.EF
{
    public class UserRepository: EFRepository<User>, IUserRepository
    {
        public UserRepository(ToDoContext context)
            :base(context)
        {
            
        }

        public User GetByName(string name)
        {            
            return GetAll().FirstOrDefault(x => x.Username == name);
        }
    }
}