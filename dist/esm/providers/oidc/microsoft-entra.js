// src/providers/oidc/microsoft-entra.ts
function MicrosoftEntraAuthProvider(config) {
  return {
    ...config,
    id: "msft-entra",
    scope: "openid profile email offline_access",
    issuer: `https://login.microsoftonline.com/${config.tenant_id}/v2.0`,
    name: "Microsoft Entra",
    algorithm: "oidc",
    kind: "oauth",
    profile: (profile) => {
      const email = profile.email;
      return {
        sub: profile.sub,
        name: profile.name,
        email: email.toLowerCase(),
        picture: profile.picture
      };
    }
  };
}
var microsoft_entra_default = MicrosoftEntraAuthProvider;
export {
  microsoft_entra_default as default
};
