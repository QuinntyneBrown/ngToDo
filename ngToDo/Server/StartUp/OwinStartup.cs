using ngToDo.Server.OAuth2;
using ngToDo.Server.Services.Contracts;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Microsoft.Practices.Unity;
using Owin;

[assembly: OwinStartup(typeof(ngToDo.Server.StartUp.OwinStartup))]

namespace ngToDo.Server.StartUp
{
    public class OwinStartup
    {
        public void Configuration(IAppBuilder app)
        {
            var identityService = UnityConfig.GetContainer().Resolve<IIdentityService>();
            app.UseOAuthAuthorizationServer(new OAuthOptions(identityService));
            app.UseJwtBearerAuthentication(new JwtOptions());
            app.UseCors(CorsOptions.AllowAll);
        }
    }
}
