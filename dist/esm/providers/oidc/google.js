// src/providers/oidc/google.ts
function GoogleAuthProvider(config) {
  return {
    ...config,
    id: "google",
    scope: "openid email profile",
    issuer: "https://accounts.google.com",
    name: "Google",
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
var google_default = GoogleAuthProvider;
export {
  google_default as default
};
