// src/core/preflights/collections.ts
import {
  InvalidCollectionSlug,
  MissingCollections
} from "../errors/consoleErrors.js";
function preflightCollectionCheck(slugs, collections) {
  if (!collections?.length) {
    throw new MissingCollections;
  }
  slugs.forEach((slug) => {
    if (!collections.some((c) => c.slug === slug)) {
      throw new InvalidCollectionSlug;
    }
  });
  return;
}
export {
  preflightCollectionCheck
};
