using ngToDo.Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ngToDo.Server.Services.Contracts
{
    public interface IToDoService
    {
        ToDo Save(ToDo entity, string username);

        IQueryable<ToDo> GetAllByUsername(string name);
    }
}
