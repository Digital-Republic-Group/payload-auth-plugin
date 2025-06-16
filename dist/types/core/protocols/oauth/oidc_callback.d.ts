import { type PayloadRequest } from "payload";
import type { OIDCProviderConfig } from "../../../types.js";
export declare function OIDCCallback(pluginType: string, request: PayloadRequest, providerConfig: OIDCProviderConfig, collections: {
    usersCollection: string;
    accountsCollection: string;
}, allowOAuthAutoSignUp: boolean, useAdmin: boolean, secret: string, successRedirectPath: string, errorRedirectPath: string): Promise<Response>;
//# sourceMappingURL=oidc_callback.d.ts.map