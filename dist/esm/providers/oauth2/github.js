// src/providers/oauth2/github.ts
var authorization_server = {
  issuer: "https://github.com",
  authorization_endpoint: "https://github.com/login/oauth/authorize",
  token_endpoint: "https://github.com/login/oauth/access_token",
  userinfo_endpoint: "https://api.github.com/user"
};
function GitHubAuthProvider(config) {
  return {
    ...config,
    id: "github",
    scope: "openid email profile",
    authorization_server,
    name: "GitHub",
    algorithm: "oauth2",
    kind: "oauth",
    profile: (profile) => {
      return {
        sub: profile.id,
        name: profile.name,
        email: profile.email,
        picture: profile.picture
      };
    }
  };
}
var github_default = GitHubAuthProvider;
export {
  github_default as default
};
