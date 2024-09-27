# Columbarium

A timeoutDB, call webhook when time is up

Usage below

```ts
 {
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
```

> Webhook
```
GET /?task_id=0 HTTP/1.1
```
