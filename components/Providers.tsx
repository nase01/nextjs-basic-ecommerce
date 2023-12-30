"use client"

import { CartProvider } from "use-shopping-cart"

import { Toaster } from "@/components/ui/toaster"
import { TailwindIndicator } from "@/components/TailwindIndicator"
import { ThemeProvider } from "@/components/ThemeProvider"

interface Props {
  children: React.ReactNode
}

export function Providers({ children }: Props) {
  return <CartProvider 
    currency="USD"
    shouldPersist
    cartMode="checkout-session"
    stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!}
  >
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Toaster />
        {children}
      <TailwindIndicator />
    </ThemeProvider>
  </CartProvider>
}
