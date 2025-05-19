// src/providers/oidc/gitlab.ts
function GitLabAuthProvider(config) {
  const algorithm = "oidc";
  return {
    ...config,
    id: "gitlab",
    scope: "openid email profile",
    issuer: "https://gitlab.com",
    name: "GitLab",
    algorithm,
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
var gitlab_default = GitLabAuthProvider;
export {
  gitlab_default as default
};
