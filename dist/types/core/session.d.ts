import { PayloadRequest } from "payload";
import { AccountInfo } from "./../types.js";
import { UserNotFoundAPIError } from "./errors/apiErrors.js";
export declare class AuthSession {
    private appName;
    private collections;
    private allowOAuthAutoSignUp;
    private secret;
    private useAdmin;
    constructor(appName: string, collections: {
        usersCollection: string;
        accountsCollection: string;
    }, allowOAuthAutoSignUp: boolean, secret: string, useAdmin: boolean);
    private oauthAccountMutations;
    oauthSessionCallback(oauthAccountInfo: AccountInfo, scope: string, issuerName: string, request: PayloadRequest): Promise<UserNotFoundAPIError | undefined>;
    passwordSessionCallback(user: Pick<AccountInfo, "email"> & {
        id: string;
    }): Promise<void>;
}
//# sourceMappingURL=session.d.ts.map