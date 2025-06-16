import type { OIDCProviderConfig, OAuthBaseProviderConfig } from "../../types.js";
type MicrosoftEntraAuthConfig = OAuthBaseProviderConfig & {
    tenant_id: string;
};
/**
 * Add Microsoft Entra OIDC Provider
 *
 * #### Callback or Redirect URL pattern
 *
 * - For Admin
 * ```
 * https://example.com/api/admin/oauth/callback/msft-entra
 * ```
 *
 * - For App
 * ```
 * https://example.com/api/{app_name}/oauth/callback/msft-entra
 * ```
 *
 * #### Plugin Setup
 *
 * ```ts
 * import { Plugin } from 'payload'
 * import {adminAuthPlugin, appAuthPlugin} from "payload-auth-plugin"
 * import {MicrosoftEntraAuthProvider} from "payload-auth-plugin/providers"
 *
 * export const plugins: Plugins[] = [
 *  //For Admin
 *  adminAuthPlugin({
 *    accountsCollectionSlug: 'adminAccounts',
 *    providers:[
 *      MicrosoftEntraAuthProvider({
 *          tenant_id: process.env.MICROSOFTENTRA_TENANT_ID as string,
 *          client_id: process.env.MICROSOFTENTRA_CLIENT_ID as string,
 *          client_secret: process.env.MICROSOFTENTRA_CLIENT_SECRET as string,
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
 *      MicrosoftEntraAuthProvider({
 *          tenant_id: process.env.MICROSOFTENTRA_TENANT_ID as string,
 *          client_id: process.env.MICROSOFTENTRA_CLIENT_ID as string,
 *          client_secret: process.env.MICROSOFTENTRA_CLIENT_SECRET as string,
 *      })
 *    ]
 *  })
 * ]
 * ```
 *
 */
declare function MicrosoftEntraAuthProvider(config: MicrosoftEntraAuthConfig): OIDCProviderConfig;
export default MicrosoftEntraAuthProvider;
//# sourceMappingURL=microsoft-entra.d.ts.map