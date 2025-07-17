// src/providers/oauth2/twitch.ts
var authorization_server = {
  issuer: "https://id.twitch.tv/oauth2",
  authorization_endpoint: "https://id.twitch.tv/oauth2/authorize",
  token_endpoint: "https://id.twitch.tv/oauth2/token",
  userinfo_endpoint: "https://id.twitch.tv/oauth2/userinfo"
};
function TwitchAuthProvider(config) {
  const { overrideScope, ...restConfig } = config;
  return {
    ...restConfig,
    id: "twitch",
    scope: overrideScope ?? "openid user:read:email",
    authorization_server,
    name: "Twitch",
    algorithm: "oauth2",
    kind: "oauth",
    params: {
      scope: overrideScope ?? "openid user:read:email",
      claims: JSON.stringify({
        id_token: { email: null, picture: null, preferred_username: null },
        userinfo: { email: null, picture: null, preferred_username: null }
      })
    },
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
var twitch_default = TwitchAuthProvider;
export {
  twitch_default as default
};
