using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(ngToDo.Server.StartUp.OwinStartup))]

namespace ngToDo.Server.StartUp
{
    public class OwinStartup
    {
        public void Configuration(IAppBuilder app)
        {

        }
    }
}
