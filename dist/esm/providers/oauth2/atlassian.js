// src/providers/oauth2/atlassian.ts
var algorithm = "oauth2";
var authorization_server = {
  issuer: "https://auth.atlassian.com",
  authorization_endpoint: "https://auth.atlassian.com/authorize",
  token_endpoint: "https://auth.atlassian.com/oauth/token",
  userinfo_endpoint: "https://api.atlassian.com/me"
};
function AtlassianAuthProvider(config) {
  return {
    ...config,
    id: "atlassian",
    authorization_server,
    name: "Atlassian",
    algorithm,
    scope: "read:me read:account",
    kind: "oauth",
    profile: (profile) => {
      return {
        sub: profile.account_id,
        name: profile.name,
        email: profile.email,
        picture: profile.picture
      };
    }
  };
}
var atlassian_default = AtlassianAuthProvider;
export {
  atlassian_default as default
};
