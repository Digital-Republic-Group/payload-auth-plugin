// src/client/password.ts
var passwordSignin = async (opts, payload) => {
  const response = await fetch(`/api/${opts.name}/auth/signin`, {
    method: "POST",
    body: JSON.stringify(payload)
  });
  const { data, message, kind, isError, isSuccess } = await response.json();
  return {
    data,
    message,
    kind,
    isError,
    isSuccess
  };
};
var passwordSignup = async (opts, payload) => {
  const response = await fetch(`/api/${opts.name}/auth/signup`, {
    method: "POST",
    body: JSON.stringify(payload)
  });
  const { data, message, kind, isError, isSuccess } = await response.json();
  return {
    data,
    message,
    kind,
    isError,
    isSuccess
  };
};
var forgotPassword = async (opts, payload) => {
  const response = await fetch(`/api/${opts.name}/auth/forgot-password?stage=init`, {
    method: "POST",
    body: JSON.stringify(payload)
  });
  const { data, message, kind, isError, isSuccess } = await response.json();
  return {
    data,
    message,
    kind,
    isError,
    isSuccess
  };
};
var recoverPassword = async (opts, payload) => {
  const response = await fetch(`/api/${opts.name}/auth/forgot-password?stage=verify`, {
    method: "POST",
    body: JSON.stringify(payload)
  });
  const { data, message, kind, isError, isSuccess } = await response.json();
  return {
    data,
    message,
    kind,
    isError,
    isSuccess
  };
};
var resetPassword = async (opts, payload) => {
  const response = await fetch(`/api/${opts.name}/auth/reset-password`, {
    method: "POST",
    body: JSON.stringify(payload)
  });
  const { data, message, kind, isError, isSuccess } = await response.json();
  return {
    data,
    message,
    kind,
    isError,
    isSuccess
  };
};
export {
  resetPassword,
  recoverPassword,
  passwordSignup,
  passwordSignin,
  forgotPassword
};
