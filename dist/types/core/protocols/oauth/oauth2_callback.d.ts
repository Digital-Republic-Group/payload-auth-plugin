import { type PayloadRequest } from "payload";
import type { OAuth2ProviderConfig } from "../../../types.js";
export declare function OAuth2Callback(pluginType: string, request: PayloadRequest, providerConfig: OAuth2ProviderConfig, collections: {
    usersCollection: string;
    accountsCollection: string;
}, allowOAuthAutoSignUp: boolean, useAdmin: boolean, secret: string, successRedirectPath: string, errorRedirectPath: string): Promise<Response>;
//# sourceMappingURL=oauth2_callback.d.ts.map