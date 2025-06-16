// src/core/errors/apiErrors.ts
import { ErrorKind } from "../../types.js";
var statusByKind = {
  [ErrorKind.NotFound]: 404,
  [ErrorKind.BadRequest]: 400,
  [ErrorKind.InternalServer]: 500,
  [ErrorKind.NotAuthenticated]: 401,
  [ErrorKind.NotAuthorized]: 403,
  [ErrorKind.Conflict]: 409
};

class AuthAPIError extends Response {
  constructor(message, kind) {
    super(JSON.stringify({
      message,
      kind,
      data: null,
      isSuccess: false,
      isError: true
    }), {
      status: statusByKind[kind]
    });
  }
}

class MissingEmailAPIError extends AuthAPIError {
  constructor() {
    super("Missing email. Email is required", ErrorKind.BadRequest);
  }
}

class UnVerifiedAccountAPIError extends AuthAPIError {
  constructor() {
    super("Account is not verfified", ErrorKind.BadRequest);
  }
}

class UserNotFoundAPIError extends AuthAPIError {
  constructor() {
    super("User not found", ErrorKind.NotFound);
  }
}

class EmailNotFoundAPIError extends AuthAPIError {
  constructor() {
    super("No user found with this email", ErrorKind.BadRequest);
  }
}

class PasskeyVerificationAPIError extends AuthAPIError {
  constructor() {
    super("Passkey verification failed", ErrorKind.BadRequest);
  }
}

class InvalidAPIRequest extends AuthAPIError {
  constructor() {
    super("Invalid API request", ErrorKind.BadRequest);
  }
}

class UnauthorizedAPIRequest extends AuthAPIError {
  constructor() {
    super("Unauthorized access", ErrorKind.NotAuthorized);
  }
}

class AuthenticationFailed extends AuthAPIError {
  constructor() {
    super("Authentication Failed", ErrorKind.NotAuthenticated);
  }
}

class InvalidCredentials extends AuthAPIError {
  constructor() {
    super("Invalid Credentials", ErrorKind.BadRequest);
  }
}

class InvalidRequestBodyError extends AuthAPIError {
  constructor() {
    super("Wrong request body. Missing parameters", ErrorKind.BadRequest);
  }
}

class EmailAlreadyExistError extends AuthAPIError {
  constructor() {
    super("Email is already taken", ErrorKind.Conflict);
  }
}

class InternalServerError extends AuthAPIError {
  constructor() {
    super("Something went wrong. Server failure", ErrorKind.BadRequest);
  }
}

class MissingOrInvalidVerification extends AuthAPIError {
  constructor() {
    super("Verifcation failed. Missing or invalid verification code.", ErrorKind.BadRequest);
  }
}
export {
  UserNotFoundAPIError,
  UnauthorizedAPIRequest,
  UnVerifiedAccountAPIError,
  PasskeyVerificationAPIError,
  MissingOrInvalidVerification,
  MissingEmailAPIError,
  InvalidRequestBodyError,
  InvalidCredentials,
  InvalidAPIRequest,
  InternalServerError,
  EmailNotFoundAPIError,
  EmailAlreadyExistError,
  AuthenticationFailed,
  AuthAPIError
};
