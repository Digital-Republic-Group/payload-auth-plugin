import type { PayloadRequest } from "payload";
export declare function OAuthAuthentication(pluginType: string, collections: {
    usersCollection: string;
    accountsCollection: string;
}, allowOAuthAutoSignUp: boolean, useAdmin: boolean, secret: string, request: PayloadRequest, successRedirectPath: string, errorRedirectPath: string, account: {
    email: string;
    sub: string;
    name: string;
    scope: string;
    issuer: string;
    picture?: string | undefined;
}): Promise<Response>;
//# sourceMappingURL=oauth_authentication.d.ts.map