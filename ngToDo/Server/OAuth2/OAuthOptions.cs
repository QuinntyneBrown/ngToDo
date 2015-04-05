using Microsoft.Owin;
using Microsoft.Owin.Security.OAuth;
using ngToDo.Server.Config;
using System;
using ngToDo.Server.Services.Contracts;

namespace ngToDo.Server.OAuth2
{
    public class OAuthOptions: OAuthAuthorizationServerOptions
    {
        public OAuthOptions(IIdentityService identityService)
        {
            var config = SecurityConfiguration.Config;

            TokenEndpointPath = new PathString(config.TokenPath);
            AccessTokenExpireTimeSpan = TimeSpan.FromMinutes(config.ExpirationMinutes);
            AccessTokenFormat = new JwtWriterFormat(this);
            Provider = new OAuthProvider(identityService);
            #if DEBUG
            AllowInsecureHttp = true;
            #endif            
        }

    }
}