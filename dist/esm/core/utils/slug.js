// src/core/utils/slug.ts
var formatSlug = (val) => val.replace(/ /g, "-").replace(/[^\w-]+/g, "").toLowerCase();
export {
  formatSlug
};
