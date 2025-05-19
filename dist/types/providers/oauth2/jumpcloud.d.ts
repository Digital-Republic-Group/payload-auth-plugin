import type { OAuth2ProviderConfig } from "../../types.js";
type JumpCloudAuthConfig = OAuth2ProviderConfig;
/**
 * Add Jump Cloud OAuth2 Provider
 *
 * #### Callback or Redirect URL pattern
 *
 * - For Admin
 * ```
 * https://example.com/api/admin/oauth/callback/jumpcloud
 * ```
 *
 * - For App
 * ```
 * https://example.com/api/{app_name}/oauth/callback/jumpcloud
 * ```
 *
 * #### Plugin Setup
 *
 * ```ts
 * import { Plugin } from 'payload'
 * import {adminAuthPlugin, appAuthPlugin} from "payload-auth-plugin"
 * import {JumpCloudAuthProvider} from "payload-auth-plugin/providers"
 *
 * export const plugins: Plugins[] = [
 *  //For Admin
 *  adminAuthPlugin({
 *    accountsCollectionSlug: 'adminAccounts',
 *    providers:[
 *      JumpCloudAuthProvider({
 *          client_id: process.env.JUMP_CLOUD_CLIENT_ID as string,
 *          client_secret: process.env.JUMP_CLOUD_CLIENT_SECRET as string,
 *      })
 *    ]
 *  })
 *
 *  // For App
 *  appAuthPlugin({
 *    name: 'app'
 *    secret: process.env.APP_AUTH_SECRET,
 *    accountsCollectionSlug: 'adminAccounts',
 *    usersCollectionSlug: 'appUsers',
 *    accountsCollectionSlug: 'appAccounts',
 *    providers:[
 *      JumpCloudAuthProvider({
 *          client_id: process.env.JUMP_CLOUD_CLIENT_ID as string,
 *          client_secret: process.env.JUMP_CLOUD_CLIENT_SECRET as string,
 *      })
 *    ]
 *  })
 * ]
 * ```
 *
 */
declare function JumpCloudAuthProvider(config: JumpCloudAuthConfig): OAuth2ProviderConfig;
export default JumpCloudAuthProvider;
//# sourceMappingURL=jumpcloud.d.ts.map