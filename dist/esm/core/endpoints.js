// src/core/endpoints.ts
import { OAuthHandlers } from "./routeHandlers/oauth.js";
import { PasskeyHandlers } from "./routeHandlers/passkey.js";
import { PasswordAuthHandlers } from "./routeHandlers/password.js";
import { SessionHandlers } from "./routeHandlers/session.js";
import { UserSession } from "./protocols/session.js";
import { APP_COOKIE_SUFFIX } from "../constants.js";
import * as qs from "qs-esm";

class OAuthEndpointStrategy {
  providers;
  constructor(providers) {
    this.providers = providers;
  }
  createEndpoints({
    pluginType,
    collections,
    allowOAuthAutoSignUp,
    secret,
    useAdmin
  }) {
    return [
      {
        path: `/${pluginType}/oauth/:resource/:provider`,
        method: "get",
        handler: (request) => {
          const provider = this.providers[request.routeParams?.provider];
          return OAuthHandlers(pluginType, collections, allowOAuthAutoSignUp, secret, useAdmin, request, request.routeParams?.resource, provider);
        }
      }
    ];
  }
}

class PasskeyEndpointStrategy {
  createEndpoints({
    pluginType,
    rpID,
    sessionCallback
  }) {
    return [
      {
        path: `/${pluginType}/passkey/:resource`,
        method: "post",
        handler: (request) => {
          return PasskeyHandlers(request, request.routeParams?.resource, rpID, (accountInfo) => {
            return sessionCallback(accountInfo, "Passkey", request.payload);
          });
        }
      }
    ];
  }
}

class PasswordAuthEndpointStrategy {
  internals;
  secret;
  constructor(internals, secret) {
    this.internals = internals;
    this.secret = secret;
  }
  createEndpoints({
    pluginType,
    sessionCallback
  }) {
    return [
      {
        path: `/${pluginType}/auth/:kind`,
        handler: (request) => {
          const stage = request.searchParams.get("stage") ?? undefined;
          return PasswordAuthHandlers(request, pluginType, request.routeParams?.kind, this.internals, (user) => sessionCallback(user), this.secret, stage);
        },
        method: "post"
      }
    ];
  }
}

class SessionEndpointStrategy {
  secret;
  internals;
  constructor(secret, internals) {
    this.secret = secret;
    this.internals = internals;
  }
  createEndpoints({ pluginType }) {
    return [
      {
        path: `/${pluginType}/session`,
        handler: (request) => {
          const query = qs.parse(request.searchParams.toString());
          return UserSession(`__${pluginType}-${APP_COOKIE_SUFFIX}`, this.secret, request, this.internals, query["fields"] ?? []);
        },
        method: "get"
      },
      {
        path: `/${pluginType}/session/:kind`,
        handler: (request) => {
          return SessionHandlers(request, pluginType, request.routeParams?.kind, this.secret);
        },
        method: "get"
      }
    ];
  }
}

class EndpointsFactory {
  pluginType;
  collections;
  allowOAuthAutoSignUp;
  secret;
  useAdmin;
  strategies = {};
  constructor(pluginType, collections, allowOAuthAutoSignUp, secret, useAdmin) {
    this.pluginType = pluginType;
    this.collections = collections;
    this.allowOAuthAutoSignUp = allowOAuthAutoSignUp;
    this.secret = secret;
    this.useAdmin = useAdmin;
  }
  registerStrategy(name, strategy) {
    this.strategies[name] = strategy;
  }
  createEndpoints(strategyName, config) {
    const strategy = this.strategies[strategyName];
    if (!strategy) {
      throw new Error(`Strategy "${strategyName}" not found.`);
    }
    return strategy.createEndpoints({
      pluginType: this.pluginType,
      allowOAuthAutoSignUp: this.allowOAuthAutoSignUp,
      secret: this.secret,
      useAdmin: this.useAdmin,
      collections: this.collections,
      ...config
    });
  }
}
export {
  SessionEndpointStrategy,
  PasswordAuthEndpointStrategy,
  PasskeyEndpointStrategy,
  OAuthEndpointStrategy,
  EndpointsFactory
};
