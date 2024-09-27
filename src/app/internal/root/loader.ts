import type { Result, RuntimeRoute, Elysia, RequestOPT, ObjectAny } from "ashes-urn";
import { t } from "ashes-urn";
import { sysConf, urn } from "../../..";
import { gateway } from "../../gateway";
import RootInterface from "./RootInterface";

const root = () => {
    let resultObject: Result = {
        status: 'ok',
        data: `Columbarium database ${sysConf.version}`
    }

    return resultObject
}

// Define Routes
const routes: RuntimeRoute[] = [
    {// This will be passed to your gateway
        path: '/',
        method: 'get',
        isDirect: true,
        handler: root
    },
    {// Add a new 
        path: "/api/v1/record/:task_id",
        method: "post",
        isDirect: false,
        handler: RootInterface.add,
        addon: {
            body: t.Object({
                webhook_url: t.String(),
                timeout: t.Number()
            }),
            params: t.Object({
                task_id: t.String()
            })
        }
    },
    {
        path: "/api/v1/record/:task_id",
        method: "put",
        isDirect: false,
        handler: RootInterface.update,
        addon: {
            params: t.Object({
                task_id: t.String()
            })
        }
    },
    {
        path: "/api/v1/record/:task_id",
        method: "delete",
        isDirect: false,
        handler: RootInterface.del,
        addon: {
            params: t.Object({
                task_id: t.String()
            })
        }
    }
]


// Module Loader
// External will overwrite Internal routes, making it more flexible
export function loader(app: Elysia) {
    urn.loadRoute(routes, app, gateway)
}