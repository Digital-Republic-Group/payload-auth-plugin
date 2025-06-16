// src/core/endpoints.ts
import { OAuthHandlers } from "./routeHandlers/oauth.js";
import { PasskeyHandlers } from "./routeHandlers/passkey.js";
import { PasswordAuthHandlers } from "./routeHandlers/password.js";
import { SessionHandlers } from "./routeHandlers/session.js";

class OAuthEndpointStrategy {
  providers;
  constructor(providers) {
    this.providers = providers;
  }
  createEndpoints({
    pluginType,
    collections,
    allowOAuthAutoSignUp,
    useAdmin,
    successRedirectPath,
    errorRedirectPath
  }) {
    return [
      {
        path: `/${pluginType}/oauth/:resource/:provider`,
        method: "get",
        handler: (request) => {
          const provider = this.providers[request.routeParams?.provider];
          return OAuthHandlers(pluginType, collections, allowOAuthAutoSignUp, request.payload.secret, useAdmin, request, provider, successRedirectPath, errorRedirectPath);
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
  providerConfig;
  constructor(internals, providerConfig) {
    this.internals = internals;
    this.providerConfig = providerConfig;
  }
  createEndpoints({
    pluginType,
    useAdmin,
    successRedirectPath,
    errorRedirectPath
  }) {
    return [
      {
        path: `/${pluginType}/auth/:kind`,
        handler: (request) => {
          const stage = request.searchParams.get("stage") ?? undefined;
          return PasswordAuthHandlers(request, pluginType, request.routeParams?.kind, this.internals, request.payload.secret, useAdmin, successRedirectPath, errorRedirectPath, this.providerConfig, stage);
        },
        method: "post"
      }
    ];
  }
}

class SessionEndpointStrategy {
  internals;
  constructor(internals) {
    this.internals = internals;
  }
  createEndpoints({ pluginType }) {
    return [
      {
        path: `/${pluginType}/session/:kind`,
        handler: (request) => {
          return SessionHandlers(request, pluginType, this.internals);
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
  useAdmin;
  successRedirectPath;
  errorRedirectPath;
  strategies = {};
  constructor(pluginType, collections, allowOAuthAutoSignUp, useAdmin, successRedirectPath, errorRedirectPath) {
    this.pluginType = pluginType;
    this.collections = collections;
    this.allowOAuthAutoSignUp = allowOAuthAutoSignUp;
    this.useAdmin = useAdmin;
    this.successRedirectPath = successRedirectPath;
    this.errorRedirectPath = errorRedirectPath;
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
      useAdmin: this.useAdmin,
      collections: this.collections,
      successRedirectPath: this.successRedirectPath,
      errorRedirectPath: this.errorRedirectPath,
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
