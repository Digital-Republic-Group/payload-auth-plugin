// src/client/oauth.ts
var oauth = (options, provider, profile) => {
  window.location.href = `http://localhost:3000/api/${options.name}/oauth/authorization/${provider}`;
};
export {
  oauth
};
