import type { RequestOPT, Result, RuntimeRoute } from "ashes-urn";
import { sysConf } from "..";

export async function gateway(contents: RequestOPT, routeObj: RuntimeRoute, app: ((...args: any[]) => Promise<Result>) | ((...args: any[]) => any)) {
    if (!contents.headers.authstring || contents.headers.authstring !== sysConf.auth) throw new Error('Authorization string mismatched');
    return await app(contents)
}