using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ngToDo.Server.Dtos
{
    public class SignInDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}