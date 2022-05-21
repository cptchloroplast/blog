import { Problem } from "@okkema/worker"

type RoutedRequest = Request & {
  query?: { [key: string]: string }
  params?: { [key: string]: string }
}

export type RequestHandler<Env> = (
  request: RoutedRequest,
  env: Env,
  ctx: ExecutionContext
) => Promise<Response | void>

type RouteHandler<Env> = (path: string, ...handlers: RequestHandler<Env>[]) => void

type Router<Env> = {
  routes: Route<Env>[]
  use: (route: Route<Env>) => void
  handle: (request: RoutedRequest, env: Env, ctx: ExecutionContext) => Promise<Response>
  get: RouteHandler<Env>
  post: RouteHandler<Env>
  put: RouteHandler<Env>
  delete: RouteHandler<Env>
  all: RouteHandler<Env>
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "ALL"

export type Route<Env> = {
  method: HttpMethod
  path: string
  handlers: RequestHandler<Env>[]
  regex?: RegExp
}

type RouterInit = {
  base?: string
  problem?: boolean
}

const Router = ({ base = "", problem = true }: RouterInit): Router<any> => {
  const routes: Route<any>[] = []

  const use = (route: Route<any>) => {
    routes.push({
      regex:
        route.regex ??
        RegExp(
          `^${(base + route.path)
            .replace(/(\/?)\*/g, "($1.*)?")
            .replace(/\/$/, "")
            .replace(/:(\w+)(\?)?(\.)?/g, "$2(?<$1>[^/]+)$2$3")
            .replace(/\.(?=[\w(])/, "\\.")}/*$`,
        ),
      ...route,
    })
  }

  return {
    routes,
    use,
    handle: async (request, env, ctx) => {
      const url = new URL(request.url)
      request.query = Object.fromEntries(url.searchParams)
      for (const { method, regex, handlers } of routes) {
        const match = url.pathname.match(regex)
        if (match && (method === request.method || method === "ALL")) {
          request.params = match.groups
          for (const handler of handlers) {
            const response = await handler(request, env, ctx)
            if (response) return response
          }
        }
      }
      if (problem)
        throw new Problem({
          detail: "The router did not return an response.",
          status: 404,
          title: "Not Found",
        })
      return new Response("Not Found", { status: 404 })
    },
    get: (path, ...handlers) =>
      use({
        method: "GET",
        path,
        handlers,
      }),
    post: (path, ...handlers) =>
      use({
        method: "POST",
        path,
        handlers,
      }),
    put: (path, ...handlers) =>
      use({
        method: "PUT",
        path,
        handlers,
      }),
    delete: (path, ...handlers) =>
      use({
        method: "DELETE",
        path,
        handlers,
      }),
    all: (path, ...handlers) =>
      use({
        method: "ALL",
        path,
        handlers,
      }),
  }
}

export default Router
