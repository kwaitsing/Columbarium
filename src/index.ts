import { URN, type ignObj } from "ashes-urn"
import { logger } from "toolbx"

// URN framework exported for other componments
export const urn = new URN(true)

// Use args, powered by minimist

const args = urn.args()

// use env

const env = urn.env()

export const sysConf = {
    version: "Kowloon@build620",
    auth: args.p || env.PSK || "mC4AhCQ3QPmVjfc8XLi6",
    port: args.a || env.PORT || 8000
}

// Server conf for urn.ignite()
const serverConf: ignObj = {
    port: sysConf.port
}

// Launch server and print the banner
const server = await urn.ignite(serverConf)
server.onError(({ code }) => {
    return {
        status: 'er',
        data: {
            msg: 'Invaild request',
            code: code
        }
    }
})

logger(`+ Columbarium ${sysConf.version} running on :${serverConf.port}`, 0)