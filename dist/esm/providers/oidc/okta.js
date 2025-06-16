// src/providers/oidc/okta.ts
function encodeString(s) {
  let h = 0;
  const l = s.length;
  let i = 0;
  if (l > 0) {
    while (i < l) {
      h = (h << 5) - h + s.charCodeAt(i++) | 0;
    }
  }
  return h;
}
function OktaAuthProvider(config) {
  const { domain, ...restConfig } = config;
  const stateCode = encodeString(config.client_id).toString();
  return {
    ...restConfig,
    id: "okta",
    scope: "email openid profile",
    issuer: `https://${domain}`,
    name: "Okta",
    algorithm: "oidc",
    kind: "oauth",
    params: {
      state: `state-${stateCode}`
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
var okta_default = OktaAuthProvider;
export {
  okta_default as default
};
