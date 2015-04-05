using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ngToDo.Server.Models;

namespace ngToDo.Server.Data
{
    public interface IUserRepository: IRepository<User>
    {
        User GetByName(string name);
    }
}
