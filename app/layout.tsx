import type { Metadata } from "next"
import { Chakra_Petch, DM_Mono } from "next/font/google"
import "./globals.css"

const chakraPetch = Chakra_Petch({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-chakra-variable",
})

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono-variable",
})

export const metadata: Metadata = {
  title: "Vinted Tool",
  description: "AI photo retouching & description generator for Vinted",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${chakraPetch.variable} ${dmMono.variable}`}>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
