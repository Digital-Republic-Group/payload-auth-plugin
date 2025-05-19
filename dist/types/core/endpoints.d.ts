import type { BasePayload, Endpoint } from "payload";
import type { AccountInfo, OAuthProviderConfig } from "../types.js";
/**
 * Base interface for all endpoint strategies. Useful to keep extending for providers with
 * different requirements to interact with
 *
 * @interface EndpointStrategy
 *
 * @typedef {EndpointStrategy}
 *
 */
interface EndpointStrategy {
    createEndpoints(config: any): Endpoint[];
}
/**
 * Oauth endpoint strategy to implement dynamic enpoints for all type of Oauth providers
 *
 * @export
 * @class OAuthEndpointStrategy
 * @typedef {OAuthEndpointStrategy}
 * @internal
 */
export declare class OAuthEndpointStrategy implements EndpointStrategy {
    private providers;
    constructor(providers: Record<string, OAuthProviderConfig>);
    createEndpoints({ pluginType, collections, allowOAuthAutoSignUp, secret, useAdmin, }: {
        pluginType: string;
        collections: {
            usersCollection: string;
            accountsCollection: string;
        };
        allowOAuthAutoSignUp: boolean;
        secret: string;
        useAdmin: boolean;
    }): Endpoint[];
}
/**
 * Passkey endpoint strategy to implement enpoints for Passkey provider
 *
 * @export
 * @class PasskeyEndpointStrategy
 * @typedef {PasskeyEndpointStrategy}
 * @implements {EndpointStrategy}
 * @internal
 */
export declare class PasskeyEndpointStrategy implements EndpointStrategy {
    createEndpoints({ pluginType, rpID, sessionCallback, }: {
        pluginType: string;
        collections: {
            usersCollection: string;
            accountsCollection: string;
        };
        rpID: string;
        sessionCallback: (accountInfo: AccountInfo, issuerName: string, payload: BasePayload) => Promise<Response>;
    }): Endpoint[];
}
/**
 * Endpoint strategy for Password based authentication
 */
export declare class PasswordAuthEndpointStrategy implements EndpointStrategy {
    private internals;
    private secret;
    constructor(internals: {
        usersCollectionSlug: string;
    }, secret: string);
    createEndpoints({ pluginType, sessionCallback, }: {
        pluginType: string;
        sessionCallback: (user: {
            id: string;
            email: string;
        }) => Promise<Response>;
    }): Endpoint[];
}
/**
 * Endpoint strategy for managing sessions
 */
export declare class SessionEndpointStrategy implements EndpointStrategy {
    private secret;
    private internals;
    constructor(secret: string, internals: {
        usersCollectionSlug: string;
    });
    createEndpoints({ pluginType }: {
        pluginType: string;
    }): Endpoint[];
}
/**
 * The generic endpoint factory class
 *
 * @export
 * @class EndpointsFactory
 * @typedef {EndpointsFactory}
 * @internal
 */
type Strategies = "oauth" | "passkey" | "password" | "session";
export declare class EndpointsFactory {
    private pluginType;
    private collections;
    private allowOAuthAutoSignUp;
    private secret;
    private useAdmin;
    private strategies;
    constructor(pluginType: string, collections: {
        usersCollection: string;
        accountsCollection: string;
    }, allowOAuthAutoSignUp: boolean, secret: string, useAdmin: boolean);
    registerStrategy(name: Strategies, strategy: EndpointStrategy): void;
    createEndpoints(strategyName: Strategies, config?: any | undefined): Endpoint[];
}
export {};
//# sourceMappingURL=endpoints.d.ts.map