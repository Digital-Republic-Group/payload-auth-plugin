// src/core/protocols/oauth/oauth_authentication.ts
import {
  UserNotFoundAPIError
} from "../../errors/apiErrors.js";
import * as jose from "jose";
import {
  createSessionCookies,
  invalidateOAuthCookies
} from "../../utils/cookies.js";
import { APP_COOKIE_SUFFIX } from "../../../constants.js";
async function OAuthAuthentication(pluginType, collections, allowOAuthAutoSignUp, useAdmin, secret, request, successRedirectPath, errorRedirectPath, account) {
  const { email, sub, name, scope, issuer, picture } = account;
  const { payload } = request;
  const userRecords = await payload.find({
    collection: collections.usersCollection,
    where: {
      email: {
        equals: email
      }
    }
  });
  let userRecord;
  if (userRecords.docs.length === 1) {
    userRecord = userRecords.docs[0];
  } else if (allowOAuthAutoSignUp) {
    const data2 = {
      email
    };
    const hasAuthEnabled = Boolean(payload.collections[collections.usersCollection].config.auth);
    if (hasAuthEnabled) {
      data2.password = jose.base64url.encode(crypto.getRandomValues(new Uint8Array(16)));
    }
    const userRecords2 = await payload.create({
      collection: collections.usersCollection,
      data: data2
    });
    userRecord = userRecords2;
  } else {
    return new UserNotFoundAPIError;
  }
  const data = {
    scope,
    name,
    picture,
    issuerName: issuer
  };
  const accountRecords = await payload.find({
    collection: collections.accountsCollection,
    where: {
      sub: { equals: sub }
    }
  });
  if (accountRecords.docs && accountRecords.docs.length === 1) {
    await payload.update({
      collection: collections.accountsCollection,
      id: accountRecords.docs[0].id,
      data
    });
  } else {
    data.sub = sub;
    data.user = userRecord.id;
    await payload.create({
      collection: collections.accountsCollection,
      data
    });
  }
  let cookies = [];
  const cookieName = useAdmin ? `${payload.config.cookiePrefix}-token` : `__${pluginType}-${APP_COOKIE_SUFFIX}`;
  cookies = [
    ...await createSessionCookies(cookieName, secret, {
      id: userRecord.id,
      email,
      collection: collections.usersCollection
    })
  ];
  cookies = invalidateOAuthCookies(cookies);
  const successRedirectionURL = new URL(`${payload.config.serverURL}${successRedirectPath}`);
  const res = new Response(null, {
    status: 302,
    headers: {
      Location: successRedirectionURL.href
    }
  });
  for (const c of cookies) {
    res.headers.append("Set-Cookie", c);
  }
  return res;
}
export {
  OAuthAuthentication
};
