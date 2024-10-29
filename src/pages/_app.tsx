import { GeistSans } from "geist/font/sans"
import { type AppType } from "next/app"
import { Analytics } from "@vercel/analytics/react"
import { Provider as JotaiProvider } from "jotai"
import { DevTools } from "jotai-devtools"
import { store } from "@/atoms"

import "../styles/globals.css"

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={GeistSans.className}>
      <JotaiProvider store={store}>
        <Component {...pageProps} />
        <Analytics />
        <DevTools theme="dark" />
      </JotaiProvider>
    </div>
  )
}

export default MyApp
