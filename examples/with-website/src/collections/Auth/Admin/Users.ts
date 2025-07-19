import { authenticated } from '@/access/authenticated'
import type { CollectionConfig } from 'payload'
import { deleteLinkedAccounts } from 'payload-auth-plugin/collection/hooks'
import { AdminAccounts } from './Accounts'
export const AdminUsers: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['firstName', 'email'],
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'firstName',
      type: 'text',
    },
    {
      name: 'lastName',
      type: 'text',
    },
  ],
  timestamps: true,
  hooks: {
    afterDelete: [deleteLinkedAccounts(AdminAccounts.slug)],
  },
}
