import { json } from "../utils"

export const subscribe = async (req: Request): Promise<Response> => {
  return json({
    ok: true,
    message: "Thanks, please check your email for confirmation!"
  })
}