export type Email = {
  to: string
  from: string
  subject: string
  html: string
}
  
type EmailService = {
  send: (email: Email) => Promise<boolean>
}
  
export function EmailService(init: {
  account: string
  secret: string
}): EmailService {
  const { account, secret } = init
  return {
    send: async (email) => {
      const { to, from, subject, html } = email
      const response = await fetch("https://api.mailjet.com/v3/send", {
        method: "POST",
        headers: {
          Authorization: `Basic ${btoa(`${account}:${secret}`)}`,
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
