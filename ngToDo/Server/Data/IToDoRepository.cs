using ngToDo.Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ngToDo.Server.Data
{
    public interface IToDoRepository: IRepository<ToDo>
    {
        IQueryable<ToDo> GetAllByUsername(string name);
    }
}
