// src/collection/index.ts
import { MissingCollectionSlug } from "../core/errors/consoleErrors.js";
var withUsersCollection = (incomingCollection) => {
  if (!incomingCollection.slug) {
    throw new MissingCollectionSlug;
  }
  if (incomingCollection.auth) {}
  const collectionConfig = {
    ...incomingCollection,
    fields: []
  };
  const baseFields = [
    {
      name: "hashedPassword",
      type: "text",
      unique: true
    },
    {
      name: "hashSalt",
      type: "text",
      unique: true
    },
    {
      name: "hashIterations",
      type: "number"
    }
  ];
  if (!collectionConfig.fields.some((field) => field.type === "email")) {
    baseFields.push({
      name: "email",
      type: "email",
      unique: true,
      required: true
    });
  }
  collectionConfig.fields = [
    ...baseFields,
    ...incomingCollection.fields ?? []
  ];
  collectionConfig.access = {
    admin: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    ...incomingCollection.access ?? {}
  };
  collectionConfig.admin = {
    defaultColumns: ["name", "email"],
    useAsTitle: "name",
    ...incomingCollection.admin
  };
  collectionConfig.timestamps = true;
  return collectionConfig;
};
var withAccountCollection = (incomingCollection, usersCollectionSlug) => {
  if (!incomingCollection.slug) {
    throw new MissingCollectionSlug;
  }
  const collectionConfig = {
    ...incomingCollection,
    fields: []
  };
  const baseFields = [
    {
      name: "name",
      type: "text"
    },
    {
      name: "picture",
      type: "text"
    },
    {
      name: "user",
      type: "relationship",
      relationTo: usersCollectionSlug,
      hasMany: false,
      required: true,
      label: "User"
    },
    {
      name: "issuerName",
      type: "text",
      required: true,
      label: "Issuer Name"
    },
    {
      name: "scope",
      type: "text"
    },
    {
      name: "sub",
      type: "text",
      required: true
    },
    {
      name: "passkey",
      type: "group",
      fields: [
        {
          name: "credentialId",
          type: "text",
          required: true
        },
        {
          name: "publicKey",
          type: "json",
          required: true
        },
        {
          name: "counter",
          type: "number",
          required: true
        },
        {
          name: "transports",
          type: "json",
          required: true
        },
        {
          name: "deviceType",
          type: "text",
          required: true
        },
        {
          name: "backedUp",
          type: "checkbox",
          required: true
        }
      ],
      admin: {
        condition: (_data, peerData) => {
          if (peerData.issuerName === "Passkey") {
            return true;
          }
          return false;
        }
      }
    }
  ];
  collectionConfig.fields = [
    ...baseFields,
    ...incomingCollection.fields ?? []
  ];
  collectionConfig.access = {
    admin: ({ req: { user } }) => Boolean(user),
    read: ({ req: { user } }) => Boolean(user),
    create: () => false,
    update: () => false,
    delete: () => true,
    ...incomingCollection.access ?? {}
  };
  collectionConfig.admin = {
    defaultColumns: ["issuerName", "scope", "user"],
    useAsTitle: "id",
    ...incomingCollection.admin
  };
  collectionConfig.timestamps = true;
  return collectionConfig;
};
export {
  withUsersCollection,
  withAccountCollection
};
