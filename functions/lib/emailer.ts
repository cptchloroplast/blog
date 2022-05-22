import { base64 } from "@okkema/worker/utils"

export type Email = {
  to: string
  from: string
  subject: string
  html: string
}

type Emailer = {
  send: (email: Email) => Promise<boolean>
}

const Emailer = (init: {
  account: string
  secret: string
}): Emailer => {
  const { account, secret } = init
  return {
    send: async (email) => {
      const { to, from, subject, html } = email
      const response = await fetch("https://api.mailjet.com/v3/send", {
        method: "POST",
        headers: {
          Authorization: `Basic ${base64.encode(`${account}:${secret}`)}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          FromEmail: from,
          Recipients:[{ Email: to }],
          Subject: subject,
          "Html-part": html,
        }),
      })
      return response.ok
    },
  }
}

export default Emailer