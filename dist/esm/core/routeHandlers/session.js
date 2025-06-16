// src/core/routeHandlers/session.ts
import { InvalidAPIRequest } from "../errors/apiErrors.js";
import {
  SessionRefresh,
  SessionSignout,
  SessionUser
} from "../protocols/session.js";
import { APP_COOKIE_SUFFIX } from "../../constants.js";
function SessionHandlers(request, pluginType, internals) {
  if (pluginType === "admin") {
    throw new InvalidAPIRequest;
  }
  const kind = request.routeParams?.kind;
  switch (kind) {
    case "refresh":
      return SessionRefresh(`__${pluginType}-${APP_COOKIE_SUFFIX}`, request);
    case "user":
      return SessionUser(`__${pluginType}-${APP_COOKIE_SUFFIX}`, request, internals, []);
    case "signout":
      return SessionSignout(`__${pluginType}-${APP_COOKIE_SUFFIX}`, request);
    default:
      throw new InvalidAPIRequest;
  }
}
export {
  SessionHandlers
};
