import { ErrorKind } from "../../types.js"

const statusByKind = {
  [ErrorKind.NotFound]: 404,
  [ErrorKind.BadRequest]: 400,
  [ErrorKind.InternalServer]: 500,
  [ErrorKind.NotAuthenticated]: 401,
  [ErrorKind.NotAuthorized]: 403,
  [ErrorKind.Conflict]: 409,
}
export class AuthAPIError extends Response {
  constructor(message: string, kind: ErrorKind) {
    super(JSON.stringify({ message, kind, data: null }), {
      status: statusByKind[kind],
    })
  }
}

export class MissingEmailAPIError extends AuthAPIError {
  constructor() {
    super("Missing email. Email is required", ErrorKind.BadRequest)
  }
}

export class UserNotFoundAPIError extends AuthAPIError {
  constructor() {
    super("User not found", ErrorKind.NotFound)
  }
}

export class EmailNotFoundAPIError extends AuthAPIError {
  constructor() {
    super("Now user found with this email", ErrorKind.BadRequest)
  }
}

export class PasskeyVerificationAPIError extends AuthAPIError {
  constructor() {
    super("Passkey verification failed", ErrorKind.BadRequest)
  }
}

export class InvalidAPIRequest extends AuthAPIError {
  constructor() {
    super("Invalid API request", ErrorKind.BadRequest)
  }
}

export class UnauthorizedAPIRequest extends AuthAPIError {
  constructor() {
    super("Unauthorized access", ErrorKind.NotAuthorized)
  }
}

export class InvalidRequestBodyError extends AuthAPIError {
  constructor() {
    super("Wrong request body. Missing parameters", ErrorKind.BadRequest)
  }
}

export class EmailAlreadyExistError extends AuthAPIError {
  constructor() {
    super("Email is already taken", ErrorKind.Conflict)
  }
}
