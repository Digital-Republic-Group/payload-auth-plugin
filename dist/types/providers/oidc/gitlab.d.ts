import type { OIDCProviderConfig, OAuthBaseProviderConfig } from "../../types.js";
type GitLabAuthConfig = OAuthBaseProviderConfig;
/**
 * Add GitLab OIDC Provider
 *
 * #### Callback or Redirect URL pattern
 *
 * - For Admin
 * ```
 * https://example.com/api/admin/oauth/callback/gitlab
 * ```
 *
 * - For App
 * ```
 * https://example.com/api/{app_name}/oauth/callback/gitlab
 * ```
 *
 * #### Plugin Setup
 *
 * ```ts
 * import { Plugin } from 'payload'
 * import {adminAuthPlugin, appAuthPlugin} from "payload-auth-plugin"
 * import {GitLabAuthProvider} from "payload-auth-plugin/providers"
 *
 * export const plugins: Plugins[] = [
 *  //For Admin
 *  adminAuthPlugin({
 *    accountsCollectionSlug: 'adminAccounts',
 *    providers:[
 *      GitLabAuthProvider({
 *          client_id: process.env.GITLAB_CLIENT_ID as string,
 *          client_secret: process.env.GITLAB_CLIENT_SECRET as string,
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
 *      GitLabAuthProvider({
 *          client_id: process.env.GITLAB_CLIENT_ID as string,
 *          client_secret: process.env.GITLAB_CLIENT_SECRET as string,
 *      })
 *    ]
 *  })
 * ]
 * ```
 *
 */
declare function GitLabAuthProvider(config: GitLabAuthConfig): OIDCProviderConfig;
export default GitLabAuthProvider;
//# sourceMappingURL=gitlab.d.ts.map