using ngToDo.Server.Models;
using System.Linq;
using System.Data.Entity;


namespace ngToDo.Server.Data.EF
{
    public class ToDoRepository: EFRepository<ToDo>, IToDoRepository
    {
        public ToDoRepository(ToDoContext toDoContext)
            :base(toDoContext)
        {
            
        }

        public IQueryable<ToDo> GetAllByUsername(string name)
        {
            return DbSet.Where(x => x.Username == name);
        }
    }
}