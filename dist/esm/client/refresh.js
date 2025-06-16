// src/client/refresh.ts
import { WrongClientUsage } from "../core/errors/consoleErrors.js";
var refresh = async (options) => {
  if (typeof window === "undefined") {
    throw new WrongClientUsage;
  }
  const response = await fetch(`${options.baseURL}/api/${options.name}/session/refresh`);
  const { message, kind, data, isError, isSuccess } = await response.json();
  return {
    message,
    kind,
    data,
    isError,
    isSuccess
  };
};
export {
  refresh
};
