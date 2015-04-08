using ngToDo.Server.Data.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ngToDo.Server.Models;

namespace ngToDo.Migrations
{
    public class ToDoConfiguration
    {
        public static void Seed(ToDoContext context)
        {
            if (context.ToDos.Count() < 1)
            {

                context.ToDos.Add(new ToDo() {Name = "Build Enterprise Angular 1.4 App", CreatedDateTime = DateTime.Now});

                context.SaveChanges();
            }
        }
    }
}