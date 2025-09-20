import { sequence } from "astro:middleware"
import { metadata } from "./metadata"
import { authenticate, authorize, error, login, router } from "@okkema/worker/web"

export const onRequest = router({
    "*": sequence(error, metadata),
    "/admin/*": sequence(login, authenticate),
    "/admin/metadata": authorize("write:metadata")
})
