// src/types.ts
var ErrorKind;
((ErrorKind2) => {
  ErrorKind2["NotFound"] = "NotFound";
  ErrorKind2["InternalServer"] = "InternalServer";
  ErrorKind2["BadRequest"] = "BadRequest";
  ErrorKind2["NotAuthorized"] = "NotAuthorized";
  ErrorKind2["NotAuthenticated"] = "NotAuthenticated";
  ErrorKind2["Conflict"] = "Conflict";
})(ErrorKind ||= {});
var SuccessKind;
((SuccessKind2) => {
  SuccessKind2["Created"] = "Created";
  SuccessKind2["Updated"] = "Updated";
  SuccessKind2["Retrieved"] = "Retrieved";
  SuccessKind2["Deleted"] = "Deleted";
})(SuccessKind ||= {});
export {
  SuccessKind,
  ErrorKind
};
