import type { OAuth2ProviderConfig, OAuthBaseProviderConfig } from "../../types.js";
type FacebookAuthConfig = OAuthBaseProviderConfig;
/**
 * Add Facebook OAuth2 Provider
 *
 * #### Callback or Redirect URL pattern
 *
 * - For Admin
 * ```
 * https://example.com/api/admin/oauth/callback/facebook
 * ```
 *
 * - For App
 * ```
 * https://example.com/api/{app_name}/oauth/callback/facebook
 * ```
 *
 * #### Plugin Setup
 *
 * ```ts
 * import { Plugin } from 'payload'
 * import {adminAuthPlugin, appAuthPlugin} from "payload-auth-plugin"
 * import {FacebookAuthProvider} from "payload-auth-plugin/providers"
 *
 * export const plugins: Plugins[] = [
 *  //For Admin
 *  adminAuthPlugin({
 *    accountsCollectionSlug: 'adminAccounts',
 *    providers:[
 *      FacebookAuthProvider({
 *          client_id: process.env.FACEBOOK_CLIENT_ID as string,
 *          client_secret: process.env.FACEBOOK_CLIENT_SECRET as string,
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
 *      FacebookAuthProvider({
 *          client_id: process.env.FACEBOOK_CLIENT_ID as string,
 *          client_secret: process.env.FACEBOOK_CLIENT_SECRET as string,
 *      })
 *    ]
 *  })
 * ]
 * ```
 *
 */
declare function FacebookAuthProvider(config: FacebookAuthConfig): OAuth2ProviderConfig;
export default FacebookAuthProvider;
//# sourceMappingURL=facebook.d.ts.map