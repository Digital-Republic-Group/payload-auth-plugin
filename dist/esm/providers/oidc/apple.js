// src/providers/oidc/apple.ts
function AppleOIDCAuthProvider(config) {
  const { overrideScope, ...restConfig } = config;
  return {
    ...restConfig,
    id: "apple",
    scope: overrideScope ?? "openid name email",
    issuer: "https://appleid.apple.com",
    name: "Apple",
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
var apple_default = AppleOIDCAuthProvider;
export {
  apple_default as default
};
