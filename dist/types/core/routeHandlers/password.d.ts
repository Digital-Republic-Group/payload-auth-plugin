import type { PayloadRequest } from "payload";
export declare function PasswordAuthHandlers(request: PayloadRequest, pluginType: string, kind: string, internal: {
    usersCollectionSlug: string;
}, sessionCallBack: (user: {
    id: string;
    email: string;
}) => Promise<Response>, secret: string, stage?: string | undefined): Promise<Response>;
//# sourceMappingURL=password.d.ts.map