using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ngToDo.Server.Models
{
    public class User:IEntity
    {
        public User()
        {
            
        }

        public int Id { get; set; }

        public string Username { get; set; }
        
        public string EmailAddress { get; set; }
        
        public string Firstname { get; set; }
        
        public string Lastname { get; set; }
        
        public string Password { get; set; }

        public DateTime? CreatedDateTime { get; set; }

        public bool IsDeleted { get; set; }
    }
}