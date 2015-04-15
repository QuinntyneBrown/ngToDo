using ngToDo.Server.Data.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ngToDo.Server.Models;
using ngToDo.Server.Services;
using ngToDo.Server.Config;

namespace ngToDo.Migrations
{
    public class UserConfiguration
    {
        public static void Seed(ToDoContext context)
        {
            if (context.Users.Count() < 1)
            {
                var password = SecurityConfiguration.Config.StorePasswordsInPlainText
                    ? new EncryptionService().TransformPassword("P@ssw0rd")
                    : "P@ssw0rd";

                context.Users.Add(new User()
                {
                    Firstname = "Quinntyne", 
                    Lastname = "Brown", 
                    Username = "quinntynebrown@gmail.com", 
                    Password = password, 
                    IsDeleted = false
                });

                context.SaveChanges();
            }
        }
    }
}