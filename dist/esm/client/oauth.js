// src/client/oauth.ts
var oauth = (options, provider) => {
  console.error("IN OAUTH FUNCTION", options, provider);
  const oauthURL = `${options.baseURL}/api/${options.name}/oauth/authorization/${provider}${options.redirectUri ? `?redirect_uri=${encodeURIComponent(options.redirectUri)}` : ""}`;
  window.location.href = oauthURL;
};
export {
  oauth
};
