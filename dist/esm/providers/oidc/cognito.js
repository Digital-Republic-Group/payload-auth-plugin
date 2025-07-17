// src/providers/oidc/cognito.ts
function CognitoAuthProvider(config) {
  const { domain, overrideScope, ...restConfig } = config;
  return {
    ...restConfig,
    id: "cognito",
    scope: overrideScope ?? "email openid profile",
    issuer: domain,
    name: "Congnito",
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
var cognito_default = CognitoAuthProvider;
export {
  cognito_default as default
};
