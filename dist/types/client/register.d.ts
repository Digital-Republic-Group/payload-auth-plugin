import { PasswordSignupPayload } from "./password.js";
interface BaseOptions {
    name: string;
}
export declare const register: (options: BaseOptions) => {
    password: (paylaod: PasswordSignupPayload) => Promise<import("../types.js").AuthPluginOutput>;
};
export {};
//# sourceMappingURL=register.d.ts.map