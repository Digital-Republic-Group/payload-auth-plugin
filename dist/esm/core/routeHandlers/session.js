// src/core/routeHandlers/session.ts
import { InvalidAPIRequest } from "../errors/apiErrors.js";
import { SessionRefresh } from "../protocols/session.js";
import { APP_COOKIE_SUFFIX } from "../../constants.js";
function SessionHandlers(request, pluginType, kind, secret) {
  if (pluginType === "admin") {
    throw new InvalidAPIRequest;
  }
  switch (kind) {
    case "refresh":
      return SessionRefresh(`__${pluginType}-${APP_COOKIE_SUFFIX}`, secret, request);
    default:
      throw new InvalidAPIRequest;
  }
}
export {
  SessionHandlers
};
