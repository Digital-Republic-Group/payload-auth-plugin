// src/core/protocols/oauth/oauth2_callback.ts
import { parseCookies } from "payload";
import * as oauth from "oauth4webapi";
import { getCallbackURL } from "../../utils/cb.js";
import { MissingOrInvalidSession } from "../../errors/consoleErrors.js";
async function OAuth2Callback(pluginType, request, providerConfig) {
  const parsedCookies = parseCookies(request.headers);
  const code_verifier = parsedCookies.get("__session-code-verifier");
  const state = parsedCookies.get("__session-oauth-state");
  const clientOrigin = parsedCookies.get("__client-origin");
  if (!code_verifier || !clientOrigin) {
    throw new MissingOrInvalidSession;
  }
  const {
    client_id,
    client_secret,
    authorization_server,
    profile,
    client_auth_type
  } = providerConfig;
  const client = {
    client_id
  };
  const clientAuth = client_auth_type === "client_secret_basic" ? oauth.ClientSecretBasic(client_secret ?? "") : oauth.ClientSecretPost(client_secret ?? "");
  const current_url = new URL(request.url);
  const callback_url = getCallbackURL(request.payload.config.serverURL, pluginType, providerConfig.id);
  const as = authorization_server;
  const params = oauth.validateAuthResponse(as, client, current_url, state);
  const grantResponse = await oauth.authorizationCodeGrantRequest(as, client, clientAuth, params, callback_url.toString(), code_verifier);
  let body = await grantResponse.json();
  let response = new Response(JSON.stringify(body), grantResponse);
  if (Array.isArray(body.scope)) {
    body.scope = body.scope.join(" ");
    response = new Response(JSON.stringify(body), grantResponse);
  }
  const token_result = await oauth.processAuthorizationCodeResponse(as, client, response);
  const userInfoResponse = await oauth.userInfoRequest(as, client, token_result.access_token);
  const userInfo = await userInfoResponse.json();
  const authorizationURL = new URL(`${request.origin}/api/${pluginType}/oauth/authentication/${providerConfig.id}`);
  const res = new Response(JSON.stringify({ process: "oauth" }), {
    headers: {
      Location: authorizationURL.href
    }
  });
  return res;
}
export {
  OAuth2Callback
};
