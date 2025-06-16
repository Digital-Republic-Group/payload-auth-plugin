// src/core/protocols/oauth/oauth2_callback.ts
import { parseCookies } from "payload";
import * as oauth from "oauth4webapi";
import { getCallbackURL } from "../../utils/cb.js";
import { MissingOrInvalidSession } from "../../errors/consoleErrors.js";
import { OAuthAuthentication } from "./oauth_authentication.js";
async function OAuth2Callback(pluginType, request, providerConfig, collections, allowOAuthAutoSignUp, useAdmin, secret, successRedirectPath, errorRedirectPath) {
  const parsedCookies = parseCookies(request.headers);
  const code_verifier = parsedCookies.get("__session-code-verifier");
  const state = parsedCookies.get("__session-oauth-state");
  if (!code_verifier) {
    throw new MissingOrInvalidSession;
  }
  const { client_id, client_secret, authorization_server, client_auth_type } = providerConfig;
  const client = {
    client_id
  };
  const clientAuth = client_auth_type === "client_secret_basic" ? oauth.ClientSecretBasic(client_secret ?? "") : oauth.ClientSecretPost(client_secret ?? "");
  const current_url = new URL(request.url);
  const callback_url = getCallbackURL(request.payload.config.serverURL, pluginType, providerConfig.id);
  const as = authorization_server;
  const params = oauth.validateAuthResponse(as, client, current_url, state);
  const grantResponse = await oauth.authorizationCodeGrantRequest(as, client, clientAuth, params, callback_url.toString(), code_verifier);
  const body = await grantResponse.json();
  let response = new Response(JSON.stringify(body), grantResponse);
  if (Array.isArray(body.scope)) {
    body.scope = body.scope.join(" ");
    response = new Response(JSON.stringify(body), grantResponse);
  }
  const token_result = await oauth.processAuthorizationCodeResponse(as, client, response);
  const userInfoResponse = await oauth.userInfoRequest(as, client, token_result.access_token);
  const userInfo = await userInfoResponse.json();
  const userData = {
    email: userInfo.email,
    name: userInfo.name ?? "",
    sub: userInfo.sub,
    scope: providerConfig.scope,
    issuer: providerConfig.authorization_server.issuer,
    picture: userInfo.picture ?? ""
  };
  return await OAuthAuthentication(pluginType, collections, allowOAuthAutoSignUp, useAdmin, secret, request, successRedirectPath, errorRedirectPath, userData);
}
export {
  OAuth2Callback
};
