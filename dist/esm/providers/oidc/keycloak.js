// src/providers/oidc/keycloak.ts
function KeyCloakAuthProvider(config) {
  const { realm, domain, identifier, name, overrideScope, ...restConfig } = config;
  return {
    ...restConfig,
    id: identifier,
    scope: overrideScope ?? "email openid profile",
    issuer: `https://${domain}/realms/${realm}`,
    name,
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
var keycloak_default = KeyCloakAuthProvider;
export {
  keycloak_default as default
};
