// src/providers/oidc/cognito.ts
function CognitoAuthProvider(config) {
  const { domain, region, ...restConfig } = config;
  return {
    ...restConfig,
    id: "cognito",
    scope: "email openid profile",
    issuer: `https://${domain}/${region}`,
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
