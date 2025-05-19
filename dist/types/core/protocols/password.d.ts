import { PayloadRequest } from "payload";
export declare const PasswordSignin: (request: PayloadRequest, internal: {
    usersCollectionSlug: string;
}, sessionCallBack: (user: {
    id: string;
    email: string;
}) => Promise<Response>) => Promise<Response>;
export declare const PasswordSignup: (request: PayloadRequest, internal: {
    usersCollectionSlug: string;
}, sessionCallBack: (user: {
    id: string;
    email: string;
}) => Promise<Response>) => Promise<Response>;
export declare const ForgotPasswordInit: (request: PayloadRequest, internal: {
    usersCollectionSlug: string;
}) => Promise<Response>;
export declare const ForgotPasswordVerify: (request: PayloadRequest, internal: {
    usersCollectionSlug: string;
}) => Promise<Response>;
export declare const ResetPassword: (cookieName: string, secret: string, internal: {
    usersCollectionSlug: string;
}, request: PayloadRequest) => Promise<Response>;
//# sourceMappingURL=password.d.ts.map