import { Router } from "@okkema/worker/core"
import { subscribe } from "./handlers/subscribe"
import { message } from "./handlers/message"
import { confirm } from "./handlers/confirm"

export const router = Router({ base: "/api" })

router.post("/subscribe", subscribe)
router.get("/subscribe/confirm", confirm)
router.post("/message", message)

router.all("*", async () => new Response("You're not supposed to be here!", { status: 403, statusText: "GTFO" }))