import type { OIDCProviderConfig, OAuthBaseProviderConfig } from "../../types.js";
type GoogleAuthConfig = OAuthBaseProviderConfig;
/**
 * Add Google OIDC Provider
 *
 * #### Callback or Redirect URL pattern
 *
 * - For Admin
 * ```
 * https://example.com/api/admin/oauth/callback/google
 * ```
 *
 * - For App
 * ```
 * https://example.com/api/{app_name}/oauth/callback/google
 * ```
 *
 * #### Plugin Setup
 *
 * ```ts
 * import { Plugin } from 'payload'
 * import {adminAuthPlugin, appAuthPlugin} from "payload-auth-plugin"
 * import {GoogleAuthProvider} from "payload-auth-plugin/providers"
 *
 * export const plugins: Plugins[] = [
 *  //For Admin
 *  adminAuthPlugin({
 *    accountsCollectionSlug: 'adminAccounts',
 *    providers:[
 *      GoogleAuthProvider({
 *          client_id: process.env.GOOGLE_CLIENT_ID as string,
 *          client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
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
 *      GoogleAuthProvider({
 *          client_id: process.env.GOOGLE_CLIENT_ID as string,
 *          client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
 *      })
 *    ]
 *  })
 * ]
 * ```
 *
 */
declare function GoogleAuthProvider(config: GoogleAuthConfig): OIDCProviderConfig;
export default GoogleAuthProvider;
//# sourceMappingURL=google.d.ts.map