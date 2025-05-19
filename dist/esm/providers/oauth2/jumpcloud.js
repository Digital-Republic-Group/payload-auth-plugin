// src/providers/oauth2/jumpcloud.ts
var authorization_server = {
  issuer: "https://oauth.id.jumpcloud.com/",
  authorization_endpoint: "https://oauth.id.jumpcloud.com/oauth2/auth",
  token_endpoint: "https://oauth.id.jumpcloud.com/oauth2/token",
  userinfo_endpoint: "https://oauth.id.jumpcloud.com/userinfo"
};
function JumpCloudAuthProvider(config) {
  return {
    ...config,
    id: "jumpcloud",
    scope: "openid email profile",
    authorization_server,
    name: "Jump Cloud",
    algorithm: "oauth2",
    profile: (profile) => {
      return {
        sub: profile.email,
        name: profile.name,
        email: profile.email,
        picture: profile.picture
      };
    }
  };
}
var jumpcloud_default = JumpCloudAuthProvider;
export {
  jumpcloud_default as default
};
