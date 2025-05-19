import type { OAuth2ProviderConfig, OAuthBaseProviderConfig } from "../../types.js";
type DiscordAuthConfig = OAuthBaseProviderConfig;
/**
 * Add Discord OAuth2 Provider
 *
 * #### Callback or Redirect URL pattern
 *
 * - For Admin
 * ```
 * https://example.com/api/admin/oauth/callback/discord
 * ```
 *
 * - For App
 * ```
 * https://example.com/api/{app_name}/oauth/callback/discord
 * ```
 *
 * #### Plugin Setup
 *
 * ```ts
 * import { Plugin } from 'payload'
 * import {adminAuthPlugin, appAuthPlugin} from "payload-auth-plugin"
 * import {DiscordAuthProvider} from "payload-auth-plugin/providers"
 *
 * export const plugins: Plugins[] = [
 *  //For Admin
 *  adminAuthPlugin({
 *    accountsCollectionSlug: 'adminAccounts',
 *    providers:[
 *      DiscordAuthProvider({
 *          client_id: process.env.DISCORD_CLIENT_ID as string,
 *          client_secret: process.env.DISCORD_CLIENT_SECRET as string,
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
 *      DiscordAuthProvider({
 *          client_id: process.env.DISCORD_CLIENT_ID as string,
 *          client_secret: process.env.DISCORD_CLIENT_SECRET as string,
 *      })
 *    ]
 *  })
 * ]
 * ```
 *
 */
declare function DiscordAuthProvider(config: DiscordAuthConfig): OAuth2ProviderConfig;
export default DiscordAuthProvider;
//# sourceMappingURL=discord.d.ts.map