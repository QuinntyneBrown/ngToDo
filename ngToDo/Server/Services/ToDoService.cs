using System.Linq;
using ngToDo.Server.Data;
using ngToDo.Server.Services.Contracts;
using ngToDo.Server.Models;

namespace ngToDo.Server.Services
{
    public class ToDoService: IToDoService
    {
        public ToDoService(IToDoRepository toDoRepository)
        {
            this.toDoRepository = toDoRepository;
        }

        public ToDo Save(ToDo entity, string username)
        {
            entity.Username = username;

            if (entity.Id == 0)
            {
                toDoRepository.Add(entity);                
            }
            else
            {
                toDoRepository.Update(entity);
            }

            toDoRepository.SaveChanges();

            return toDoRepository.GetById(entity.Id);
        }

        public IQueryable<ToDo> GetAllByUsername(string name)
        {
            return this.toDoRepository.GetAllByUsername(name);
        }

        private IToDoRepository toDoRepository { get; set; }
    }
}