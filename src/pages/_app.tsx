import { GeistSans } from "geist/font/sans"
import { type AppType } from "next/app"
import { Analytics } from "@vercel/analytics/react"

import "../styles/globals.css"

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={GeistSans.className}>
      <Component {...pageProps} />
      <Analytics />
    </div>
  )
}

export default MyApp
