import "./globals.css"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Providers } from "@/components/Providers"
import { SiteBlob } from "@/components/SiteBlob"
import { SiteFooter } from "@/components/SiteFooter"
import { SiteHeader } from "@/components/SiteHeader"

export const metadata: Metadata = {
  title: `${siteConfig.name} - Online Shopping Mall`,
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico"
  }
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <Providers>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <SiteBlob />
              <div className="flex-1">{children}</div>
              <SiteFooter />
            </div>
          </Providers>
        </body>
      </html>
    </>
  )
}
