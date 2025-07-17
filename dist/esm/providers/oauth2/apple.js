// src/providers/oauth2/apple.ts
var authorization_server = {
  issuer: "https://appleid.apple.com",
  authorization_endpoint: "https://appleid.apple.com/auth/authorize",
  token_endpoint: "https://appleid.apple.com/auth/token"
};
function AppleOAuth2Provider(config) {
  const { overrideScope, ...restConfig } = config;
  return {
    ...restConfig,
    id: "apple",
    scope: overrideScope ?? "name email",
    authorization_server,
    name: "Apple",
    algorithm: "oauth2",
    params: {
      ...config.params,
      response_mode: "form_post"
    },
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
var apple_default = AppleOAuth2Provider;
export {
  apple_default as default
};
