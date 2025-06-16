// src/client/oauth.ts
var oauth = (options, provider) => {
  const oauthURL = `${options.baseURL}/api/${options.name}/oauth/authorization/${provider}`;
  window.location.href = oauthURL;
};
export {
  oauth
};
