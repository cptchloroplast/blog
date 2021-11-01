import { json } from "../utils"

export const message = async (req: Request): Promise<Response> => {
  return json({
    ok: true,
    message: "Transmission recieved. We'll get back to you soon!"
  })
}