// src/core/protocols/oauth/oauth_authentication.ts
import {
  parseCookies
} from "payload";
import {
  InvalidRequestBodyError,
  UserNotFoundAPIError
} from "../../errors/apiErrors.js";
import * as jose from "jose";
import {
  createSessionCookies,
  invalidateOAuthCookies
} from "../../utils/cookies.js";
import { APP_COOKIE_SUFFIX } from "../../../constants.js";
async function OAuthAuthentication(pluginType, collections, allowOAuthAutoSignUp, useAdmin, request) {
  const sub = request.searchParams.get("sub");
  const email = request.searchParams.get("email");
  const name = request.searchParams.get("name");
  const scope = request.searchParams.get("scope");
  const issuer = request.searchParams.get("issuer");
  const picture = request.searchParams.get("picture");
  if (!sub || !email || !scope || !issuer) {
    return new InvalidRequestBodyError;
  }
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
    let data2 = {
      email
    };
    const hasAuthEnabled = Boolean(payload.collections[collections.usersCollection].config.auth);
    if (hasAuthEnabled) {
      data2["password"] = jose.base64url.encode(crypto.getRandomValues(new Uint8Array(16)));
    }
    const cookies2 = parseCookies(request.headers);
    if (cookies2.has("oauth_profile")) {
      const profileData = JSON.parse(decodeURIComponent(cookies2.get("oauth_profile")));
      data2 = {
        ...data2,
        ...profileData,
        issuerName: "google"
      };
    }
    console.log("-============================-");
    console.log(data2);
    console.log("-============================-");
    console.log("-============================-");
    const userRecords2 = await payload.create({
      collection: collections.usersCollection,
      data: { ...data2, issuerName: "google" }
    });
    userRecord = userRecords2;
  } else {
    return new UserNotFoundAPIError;
  }
  const data = {
    scope,
    name,
    picture,
    issuer
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
    data["sub"] = sub;
    data["user"] = userRecord["id"];
    await payload.create({
      collection: collections.accountsCollection,
      data: { ...data, issuerName: "google" }
    });
  }
  let cookies = [];
  const cookieName = useAdmin ? `${payload.config.cookiePrefix}-token` : `__${pluginType}-${APP_COOKIE_SUFFIX}`;
  const secret = payload.secret;
  cookies = [
    ...await createSessionCookies(cookieName, secret, {
      id: userRecord["id"],
      email,
      collection: collections.usersCollection
    })
  ];
  cookies = invalidateOAuthCookies(cookies);
  const redirect = new Response(null, {
    status: 302,
    headers: {
      Location: "/"
    }
  });
  cookies.forEach((cookie) => {
    redirect.headers.append("Set-Cookie", cookie);
  });
  return redirect;
}
export {
  OAuthAuthentication
};
