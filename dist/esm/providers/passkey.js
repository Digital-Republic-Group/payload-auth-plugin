// src/providers/passkey.ts
function PasskeyAuthProvider() {
  return {
    id: "passkey",
    kind: "passkey"
  };
}
var passkey_default = PasskeyAuthProvider;
export {
  passkey_default as default
};
