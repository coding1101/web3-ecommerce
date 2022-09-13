import { withTRPC } from '@trpc/next'
import { AppType } from 'next/dist/shared/lib/utils'
import Head from 'next/head'
import { AppRouter } from './api/trpc/[trpc]'

import '../styles/globals.css'

const App: AppType = ({ Component, pageProps }) => {
  return (
    <div>
      <Head>
        <title>Web3 Ecommerce</title>
        <link
          rel='Favicon'
          href='/favicon.png'
          type='image/x-icon'
        />
      </Head>

      <Component {...pageProps} />
    </div>
  )
}

export default withTRPC<AppRouter>({
  config() {
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : 'http://localhost:3000/api/trpc'
    return {
      url,
    }
  },

  ssr: false,
})(App)
