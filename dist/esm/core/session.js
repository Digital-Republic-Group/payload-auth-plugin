// src/core/session.ts
import {
  parseCookies
} from "payload";
import {
  createSessionCookies,
  invalidateOAuthCookies
} from "./utils/cookies.js";
import { APP_COOKIE_SUFFIX } from "./../constants.js";
import * as jose from "jose";
import { UserNotFoundAPIError } from "./errors/apiErrors.js";

class AuthSession {
  appName;
  collections;
  allowOAuthAutoSignUp;
  secret;
  useAdmin;
  constructor(appName, collections, allowOAuthAutoSignUp, secret, useAdmin) {
    this.appName = appName;
    this.collections = collections;
    this.allowOAuthAutoSignUp = allowOAuthAutoSignUp;
    this.secret = secret;
    this.useAdmin = useAdmin;
  }
  async oauthAccountMutations(userId, oauthAccountInfo, scope, issuerName, payload) {
    const data = {
      scope,
      name: oauthAccountInfo.name,
      picture: oauthAccountInfo.picture,
      issuerName
    };
    const accountRecords = await payload.find({
      collection: this.collections.accountsCollection,
      where: {
        sub: { equals: oauthAccountInfo.sub }
      }
    });
    if (accountRecords.docs && accountRecords.docs.length === 1) {
      return await payload.update({
        collection: this.collections.accountsCollection,
        id: accountRecords.docs[0].id,
        data
      });
    } else {
      data["sub"] = oauthAccountInfo.sub;
      data["user"] = userId;
      return await payload.create({
        collection: this.collections.accountsCollection,
        data
      });
    }
  }
  async oauthSessionCallback(oauthAccountInfo, scope, issuerName, request) {
    const { payload } = request;
    const userRecords = await payload.find({
      collection: this.collections.usersCollection,
      where: {
        email: {
          equals: oauthAccountInfo.email
        }
      }
    });
    let userRecord;
    if (userRecords.docs.length === 1) {
      userRecord = userRecords.docs[0];
    } else if (this.allowOAuthAutoSignUp) {
      let data = {
        email: oauthAccountInfo.email
      };
      const hasAuthEnabled = Boolean(payload.collections[this.collections.usersCollection].config.auth);
      if (hasAuthEnabled) {
        data["password"] = jose.base64url.encode(crypto.getRandomValues(new Uint8Array(16)));
      }
      const cookies2 = parseCookies(request.headers);
      if (cookies2.has("oauth_profile")) {
        const profileData = JSON.parse(decodeURIComponent(cookies2.get("oauth_profile")));
        data = {
          ...data,
          ...profileData
        };
      }
      const userRecords2 = await payload.create({
        collection: this.collections.usersCollection,
        data
      });
      userRecord = userRecords2;
    } else {
      return new UserNotFoundAPIError;
    }
    await this.oauthAccountMutations(userRecord["id"], oauthAccountInfo, scope, issuerName, payload);
    let cookies = [];
    const cookieName = this.useAdmin ? `${payload.config.cookiePrefix}-token` : `__${this.appName}-${APP_COOKIE_SUFFIX}`;
    const secret = this.useAdmin ? payload.secret : this.secret;
    cookies = [
      ...await createSessionCookies(cookieName, secret, {
        id: userRecord["id"],
        email: oauthAccountInfo.email,
        collection: this.collections.usersCollection
      })
    ];
    cookies = invalidateOAuthCookies(cookies);
    return;
  }
  async passwordSessionCallback(user) {
    let cookies = [];
    cookies = [
      ...await createSessionCookies(`__${this.appName}-${APP_COOKIE_SUFFIX}`, this.secret, {
        id: user.id,
        email: user.email,
        collection: this.collections.usersCollection
      })
    ];
    cookies = invalidateOAuthCookies(cookies);
  }
}
export {
  AuthSession
};
