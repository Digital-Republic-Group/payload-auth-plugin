import type { PayloadRequest } from "payload";
import type { OAuthProviderConfig } from "../../types.js";
export declare function OAuthHandlers(pluginType: string, collections: {
    usersCollection: string;
    accountsCollection: string;
}, allowOAuthAutoSignUp: boolean, secret: string, useAdmin: boolean, request: PayloadRequest, provider: OAuthProviderConfig, successRedirectPath: string, errorRedirectPath: string): Promise<Response>;
//# sourceMappingURL=oauth.d.ts.map