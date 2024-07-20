import { logger, type ObjectAny, type RequestOPT } from "ashes-urn";

let timeoutDB: ObjectAny = {}

class RootInterface {
    add(contents: RequestOPT) {
        const body = contents.body as ObjectAny
        const params = contents.params as ObjectAny
        const task_id = params.task_id

        if (!timeoutDB[task_id]) {

            timeoutDB[task_id] = {
                data: body,
                counter: setTimeout(async () => {
                    try {
                        await fetch(body.webhook_url + '?task_id=' + task_id, {
                            method: "GET"
                        })
                    } catch (error) {
                        logger(`@RootInterface/add -> ${error}`, 2)
                    }
                }, body.timeout * 1000)
            }

            return {
                status: 'ok',
            }
        } else {
            throw new Error("URN for this object is running");
        }
    }
    update(contents: RequestOPT) {

        const params = contents.params as ObjectAny
        const task_id = params.task_id

        if (timeoutDB[task_id]) {

            const data = timeoutDB[task_id]['data']

            // Clear the existing timeout
            if (timeoutDB[task_id]) {
                clearTimeout(timeoutDB[task_id]['counter']);
            }

            // Set a new timeout with the fetched configuration
            timeoutDB[task_id]['counter'] = setTimeout(async () => {
                try {
                    await fetch(data.webhook_url + '?task_id=' + task_id, {
                        method: "GET"
                    })
                } catch (error) {
                    logger(`@RootInterface/add -> ${error}`, 2)
                };
            }, data.timeout * 1000);

            return {
                status: 'ok',
            }
        } else {
            throw new Error("URN for this object is not available");
        }
    }
    del(contents: RequestOPT) {
        const params = contents.params as ObjectAny;
        const task_id = params.task_id;

        if (timeoutDB[task_id]) {
            clearTimeout(timeoutDB[task_id]['counter']);

            return {
                status: 'ok',
            }
        } else {
            throw new Error("URN for this object is not available");
        }
    }
}

export default new RootInterface