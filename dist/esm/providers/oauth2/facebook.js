// src/providers/oauth2/facebook.ts
var authorization_server = {
  issuer: "https://www.facebook.com",
  authorization_endpoint: "https://www.facebook.com/v19.0/dialog/oauth",
  token_endpoint: "https://graph.facebook.com/oauth/access_token",
  userinfo_endpoint: "https://graph.facebook.com/me?fields=id,name,email,picture"
};
function FacebookAuthProvider(config) {
  return {
    ...config,
    id: "facebook",
    scope: "email",
    authorization_server,
    name: "Facebook",
    algorithm: "oauth2",
    kind: "oauth",
    profile: (profile) => {
      let picture;
      if (typeof profile.picture === "object" && profile.picture !== null) {
        const dataContainer = profile.picture;
        if ("data" in dataContainer) {
          picture = dataContainer.data.url;
        }
      }
      return {
        sub: profile.id,
        name: profile.name,
        email: profile.email,
        picture
      };
    }
  };
}
var facebook_default = FacebookAuthProvider;
export {
  facebook_default as default
};
