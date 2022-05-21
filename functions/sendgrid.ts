declare const SENDGRID_API_KEY: string
declare const ADMIN_EMAIL: string

export const sendEmail = async (to: string, subject: string, content: string) => {
  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${SENDGRID_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [
        { to: [{ email: to, }], }
      ],
      subject,
      content: [{ type: "text/html", value: content, }],
      from: { email: ADMIN_EMAIL, },
      reply_to: { email: ADMIN_EMAIL, },
    }),
  })
  return response.ok
}