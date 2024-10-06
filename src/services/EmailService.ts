import { Problem } from "@okkema/worker"

export type Email = {
  to: {
    email: string
  }[]
  subject: string
  html: string
}
  
type EmailService = {
  send: (email: Email) => Promise<Response>
}

type OauthEnvironment = {
  OAUTH_CLIENT_ID: string
  OAUTH_CLIENT_SECRET: string
  OAUTH_TENANT: string
}

type OauthResponse = {
  access_token: string
  expires_in: number
  scope: string
  token_type: string
}

function OauthService(env: OauthEnvironment) {
  return {
    async token(audience: string, scope: string) {
      const response = await fetch(`https://${env.OAUTH_TENANT}/oauth/token`, {
        method: "POST",
        headers: {
          "Authorization": `Basic ${btoa(`${env.OAUTH_CLIENT_ID}:${env.OAUTH_CLIENT_SECRET}`)}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          audience,
          grant_type: "client_credentials",
          scope,
        })
      })
      if (!response.ok) throw new Problem({ 
        title: "Oauth Token Error", 
        detail: "Token response is not ok", 
        status: response.status 
      })
      return response.json<OauthResponse>()
    }
  }
}

type EmailServiceEnvironment = {
  EMAIL_OAUTH_AUDIENCE: string
  EMAIL_OAUTH_SCOPE: string
} & OauthEnvironment

export function EmailService(env: EmailServiceEnvironment): EmailService {
  const oauth = OauthService(env)
  return {
    async send(email) {
      const { token_type, access_token } = await oauth.token(env.EMAIL_OAUTH_AUDIENCE, env.EMAIL_OAUTH_SCOPE)
      const response = await fetch(env.EMAIL_OAUTH_AUDIENCE, {
        method: "POST",
        headers: {
          "Authorization": `${token_type} ${access_token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(email),
      })
      return response
    }
  }
}
