import { PayloadRequest } from "payload";
export declare const SessionRefresh: (cookieName: string, secret: string, request: PayloadRequest) => Promise<Response>;
export declare const UserSession: (cookieName: string, secret: string, request: PayloadRequest, internal: {
    usersCollectionSlug: string;
}, fields: string[]) => Promise<Response>;
//# sourceMappingURL=session.d.ts.map