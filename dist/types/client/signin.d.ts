import { PasswordSigninPayload } from "./password.js";
import { OauthProvider } from "./oauth.js";
interface BaseOptions {
    name: string;
}
export declare const signin: (options: BaseOptions) => {
    oauth: (provider: OauthProvider, profile?: Record<string, unknown> | undefined) => Promise<void>;
    passkey: () => Promise<void>;
    password: (payload: PasswordSigninPayload) => Promise<import("../types.js").AuthPluginOutput>;
};
export {};
//# sourceMappingURL=signin.d.ts.map