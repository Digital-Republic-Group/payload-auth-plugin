interface BaseOptions {
    name: string;
}
interface QueryOptions {
    fields?: string[] | undefined;
}
export declare const useUser: (options: BaseOptions, queryOpts?: QueryOptions | undefined) => Promise<{
    message: string;
    kind: import("../types.js").ErrorKind | import("../types.js").SuccessKind;
    data: any;
}>;
export {};
//# sourceMappingURL=hooks.d.ts.map