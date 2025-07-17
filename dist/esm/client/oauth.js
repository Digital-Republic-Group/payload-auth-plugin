// src/client/oauth.ts
var oauth = (options, provider) => {
  const oauthURL = `${options.baseURL}/api/${options.name}/oauth/authorization/${provider}?asdasd=adsasd&${options.redirectUri ? `redirect_uri=${encodeURIComponent(options.redirectUri)}` : ""}`;
  window.location.href = oauthURL;
};
export {
  oauth
};
