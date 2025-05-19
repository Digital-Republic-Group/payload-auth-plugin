import type { OAuth2ProviderConfig, OAuthBaseProviderConfig } from "../../types.js";
type GitHubAuthConfig = OAuthBaseProviderConfig;
/**
 * Add Github OAuth2 Provider
 *
 * #### Callback or Redirect URL pattern
 *
 * - For Admin
 * ```
 * https://example.com/api/admin/oauth/callback/github
 * ```
 *
 * - For App
 * ```
 * https://example.com/api/{app_name}/oauth/callback/github
 * ```
 *
 * #### Plugin Setup
 *
 * ```ts
 * import { Plugin } from 'payload'
 * import {adminAuthPlugin, appAuthPlugin} from "payload-auth-plugin"
 * import {GithubAuthProvider} from "payload-auth-plugin/providers"
 *
 * export const plugins: Plugins[] = [
 *  //For Admin
 *  adminAuthPlugin({
 *    accountsCollectionSlug: 'adminAccounts',
 *    providers:[
 *      GithubAuthProvider({
 *          client_id: process.env.GITHUB_CLIENT_ID as string,
 *          client_secret: process.env.GITHUB_CLIENT_SECRET as string,
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
 *      GithubAuthProvider({
 *          client_id: process.env.GITHUB_CLIENT_ID as string,
 *          client_secret: process.env.GITHUB_CLIENT_SECRET as string,
 *      })
 *    ]
 *  })
 * ]
 * ```
 *
 */
declare function GitHubAuthProvider(config: GitHubAuthConfig): OAuth2ProviderConfig;
export default GitHubAuthProvider;
//# sourceMappingURL=github.d.ts.map