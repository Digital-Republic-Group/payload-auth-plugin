// src/client/signin.ts
import { passwordSignin } from "./password.js";
import { oauth } from "./oauth.js";
var signin = (options) => {
  return {
    oauth: (provider) => oauth(options, provider),
    password: async (payload) => await passwordSignin(options, payload)
  };
};
export {
  signin
};
