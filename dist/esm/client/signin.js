// src/client/signin.ts
import { passwordSignin } from "./password.js";
import { oauth } from "./oauth.js";
import { init as passkeyInit } from "./passkey/index.js";
var signin = (options) => {
  return {
    oauth: async (provider, profile) => await oauth(options, provider, profile),
    passkey: () => passkeyInit(),
    password: async (payload) => await passwordSignin(options, payload)
  };
};
export {
  signin
};
