using System.Data.Entity.Migrations;
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
            var password = SecurityConfiguration.Config.StorePasswordsInPlainText
                ? "P@ssw0rd"
                : PasswordHash.PasswordHash.CreateHash("P@ssw0rd");


            context.Users.AddOrUpdate(new User()
            {
                Id=1,
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