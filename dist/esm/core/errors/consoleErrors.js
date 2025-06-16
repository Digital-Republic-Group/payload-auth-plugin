// src/core/errors/consoleErrors.ts
class PluginError extends Error {
  constructor(message, cause) {
    super(message);
    this.name = "PAYLOAD_AUTH_PLUGIN_ERROR";
    this.message = message;
    this.cause = cause;
    this.stack = "";
  }
}

class MissingPayloadAuthBaseURL extends PluginError {
  constructor() {
    super("Missing or invalid Payload Auth base URL");
  }
}

class InvalidServerURL extends PluginError {
  constructor() {
    super("Missing or invalid server URL. Please set serverURL in your Payload config");
  }
}

class InvalidProvider extends PluginError {
  constructor() {
    super("Invalid Provider");
  }
}

class ProviderAlreadyExists extends PluginError {
  constructor() {
    super("Duplicate provider found");
  }
}

class InvalidOAuthAlgorithm extends PluginError {
  constructor() {
    super("Invalid OAuth Algorithm. Plugin only support OIDC and OAuth2 algorithms");
  }
}

class InvalidOAuthResource extends PluginError {
  constructor() {
    super("Invalid resource request. Check docs before initiating requests");
  }
}

class MissingOrInvalidSession extends PluginError {
  constructor() {
    super("Missing or invalid session.");
  }
}

class MissingOrInvalidParams extends PluginError {
  constructor() {
    super("Missing or invalid params");
  }
}

class MissingSecret extends PluginError {
  constructor() {
    super("Missing secret in the options");
  }
}

class AuthenticationFailed extends PluginError {
  constructor() {
    super("Failed to authenticate");
  }
}

class UserNotFound extends PluginError {
  constructor() {
    super("User not found");
  }
}

class InvalidCredentials extends PluginError {
  constructor() {
    super("Invalid credentials");
  }
}

class MissingUsersCollection extends PluginError {
  constructor() {
    super("Missing users collection");
  }
}

class InvalidPasskeyRequest extends PluginError {
  constructor() {
    super("Invalid or missing request");
  }
}

class InvalidCollectionSlug extends PluginError {
  constructor() {
    super("Missing or invalid collection slug");
  }
}

class MissingCollections extends PluginError {
  constructor() {
    super("Missing collections");
  }
}

class MissingEnv extends PluginError {
  constructor(env) {
    super("Missing ENV " + env);
  }
}

class MissingEmailAdapter extends PluginError {
  constructor() {
    super("Email adapter is required. Check the docs for the setup: https://payloadcms.com/docs/email/overview");
  }
}

class MissingCollectionSlug extends PluginError {
  constructor() {
    super("Missing collection slug");
  }
}

class WrongClientUsage extends PluginError {
  constructor() {
    super("Using client only code in server side");
  }
}
export {
  WrongClientUsage,
  UserNotFound,
  ProviderAlreadyExists,
  MissingUsersCollection,
  MissingSecret,
  MissingPayloadAuthBaseURL,
  MissingOrInvalidSession,
  MissingOrInvalidParams,
  MissingEnv,
  MissingEmailAdapter,
  MissingCollections,
  MissingCollectionSlug,
  InvalidServerURL,
  InvalidProvider,
  InvalidPasskeyRequest,
  InvalidOAuthResource,
  InvalidOAuthAlgorithm,
  InvalidCredentials,
  InvalidCollectionSlug,
  AuthenticationFailed
};
