// src/client/hooks.ts
import * as qs from "qs-esm";
var useUser = async (options, queryOpts) => {
  const base = process.env.NEXT_PUBLIC_SERVER_URL;
  let query = "";
  if (queryOpts) {
    query = "?";
    if (queryOpts.fields) {
      query += qs.stringify({ fields: queryOpts.fields });
    }
  }
  const response = await fetch(`${base}/api/${options.name}/session${query}`);
  const { message, kind, data } = await response.json();
  return {
    message,
    kind,
    data
  };
};
export {
  useUser
};
