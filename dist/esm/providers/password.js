// src/providers/password.ts
function PasswordProvider(options) {
  return {
    id: "password",
    kind: "password",
    ...options
  };
}
var password_default = PasswordProvider;
export {
  password_default as default
};
