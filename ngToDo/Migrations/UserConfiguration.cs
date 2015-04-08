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
                string password = "P@ssw0rd";
                if (SecurityConfiguration.Config.StorePasswordsInPlainText == false)
                {
                    password = new EncryptionService().TransformPassword(password);
                }

                context.Users.Add(new User() { Firstname = "Quinntyne", Lastname = "Brown", Username = "quinntynebrown@gmail.com", Password = password, IsDeleted = false });

                context.SaveChanges();
            }
        }
    }
}