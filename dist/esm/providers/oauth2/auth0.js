// src/providers/oauth2/auth0.ts
function Auth0AuthProvider(config) {
  const { domain, ...restConfig } = config;
  const authorization_server = {
    issuer: `https://${domain}/`,
    authorization_endpoint: `https://${domain}/authorize`,
    token_endpoint: `https://${domain}/oauth/token`,
    userinfo_endpoint: `https://${domain}/userinfo`
  };
  return {
    ...restConfig,
    id: "auth0",
    scope: "openid email profile",
    authorization_server,
    name: "Auth0",
    algorithm: "oauth2",
    kind: "oauth",
    profile: (profile) => {
      return {
        sub: profile.sub,
        name: profile.name,
        email: profile.email,
        picture: profile.picture
      };
    }
  };
}
var auth0_default = Auth0AuthProvider;
export {
  auth0_default as default
};
