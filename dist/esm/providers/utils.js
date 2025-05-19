// src/providers/utils.ts
import { ProviderAlreadyExists } from "../core/errors/consoleErrors.js";
function getOAuthProviders(providers) {
  const records = {};
  providers.map((provider) => {
    if (records[provider.id]) {
      throw new ProviderAlreadyExists;
    }
    if (provider.kind === "oauth") {
      records[provider.id] = provider;
    }
  });
  return records;
}
function getPasskeyProvider(providers) {
  const passkeyProvider = providers.find((provider) => provider.kind === "passkey");
  if (passkeyProvider) {
    return passkeyProvider;
  }
  return null;
}
function getPasswordProvider(providers) {
  const provider = providers.find((provider2) => provider2.kind === "password");
  if (provider) {
    return provider;
  }
  return null;
}
export {
  getPasswordProvider,
  getPasskeyProvider,
  getOAuthProviders
};
