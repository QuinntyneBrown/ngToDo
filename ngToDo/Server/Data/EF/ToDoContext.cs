using ngToDo.Server.Models;
using System.Data.Entity;

namespace ngToDo.Server.Data.EF
{
    public class ToDoContext : System.Data.Entity.DbContext
    {
        public ToDoContext()
            : base(nameOrConnectionString: "ngToDo")
        {
            Configuration.ProxyCreationEnabled = false;
            Configuration.LazyLoadingEnabled = false;
            Configuration.AutoDetectChangesEnabled = true;
        }

        public DbSet<ToDo> ToDos { get; set; }

        
    }
}