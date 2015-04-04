using ngToDo.Server.Models;

namespace ngToDo.Server.Data.EF
{
    public class ToDoRepository: EFRepository<ToDo>, IToDoRepository
    {
        public ToDoRepository(ToDoContext toDoContext)
            : base(toDoContext)
        {
            
        }
    }
}