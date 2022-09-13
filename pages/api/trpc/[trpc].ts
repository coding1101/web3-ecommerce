import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'

export const appRouter = trpc.router()

export type AppRouter = typeof appRouter

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
})
