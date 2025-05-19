// src/client/register.ts
import { passwordSignup } from "./password.js";
var register = (options) => {
  return {
    password: async (paylaod) => await passwordSignup(options, paylaod)
  };
};
export {
  register
};
