// src/providers/oidc/slack.ts
function SlackAuthProvider(config) {
  return {
    ...config,
    id: "slack",
    scope: "openid email profile",
    issuer: "https://slack.com",
    name: "Slack",
    algorithm: "oidc",
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
var slack_default = SlackAuthProvider;
export {
  slack_default as default
};
