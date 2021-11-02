import { Router } from "itty-router"
import { subscribe } from "./handlers/subscribe"
import { message } from "./handlers/message"

export const router = Router({ base: "/api" })

router.post("/subscribe", subscribe)
router.post("/message", message)

router.all("*", () => new Response("You're not supposed to be here!", { status: 403, statusText: "GTFO" }))