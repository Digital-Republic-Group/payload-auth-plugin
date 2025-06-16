import type { OAuth2ProviderConfig, OAuthBaseProviderConfig } from "../../types.js";
type AtlassianAuthConfig = OAuthBaseProviderConfig;
/**
 * Add Atlassian OAuth2 Provider
 *
 * #### Callback or Redirect URL pattern
 *
 * - For Admin
 * ```
 * https://example.com/api/admin/oauth/callback/atlassian
 * ```
 *
 * - For App
 * ```
 * https://example.com/api/{app_name}/oauth/callback/atlassian
 * ```
 *
 * #### Plugin Setup
 *
 * ```ts
 * import { Plugin } from 'payload'
 * import {adminAuthPlugin, appAuthPlugin} from "payload-auth-plugin"
 * import {AtlassianAuthProvider} from "payload-auth-plugin/providers"
 *
 * export const plugins: Plugins[] = [
 *  //For Admin
 *  adminAuthPlugin({
 *    accountsCollectionSlug: 'adminAccounts',
 *    providers:[
 *      AtlassianAuthProvider({
 *          client_id: process.env.ATLASSIAN_CLIENT_ID as string,
 *          client_secret: process.env.ATLASSIAN_CLIENT_SECRET as string,
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
 *      AtlassianAuthProvider({
 *          client_id: process.env.ATLASSIAN_CLIENT_ID as string,
 *          client_secret: process.env.ATLASSIAN_CLIENT_SECRET as string,
 *      })
 *    ]
 *  })
 * ]
 * ```
 *
 */
declare function AtlassianAuthProvider(config: AtlassianAuthConfig): OAuth2ProviderConfig;
export default AtlassianAuthProvider;
//# sourceMappingURL=atlassian.d.ts.map