type BaseOptions = {
    name: string;
};
export type OauthProvider = "google" | "github" | "apple" | "cognito" | "gitlab" | "msft-entra" | "slack" | "atlassian" | "auth0" | "discord" | "facebook" | "jumpcloud" | "twitch";
export declare const oauth: (options: BaseOptions, provider: OauthProvider, profile?: Record<string, unknown> | undefined) => void;
export {};
//# sourceMappingURL=oauth.d.ts.map