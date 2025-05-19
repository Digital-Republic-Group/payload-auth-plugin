// src/client/refresh.ts
var refresh = async (options) => {
  const base = process.env.NEXT_PUBLIC_SERVER_URL;
  const response = await fetch(`${base}/api/${options.name}/session/refresh`);
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
