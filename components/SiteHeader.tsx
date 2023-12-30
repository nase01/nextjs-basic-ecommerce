"use client"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Edit, ShoppingBag } from "lucide-react"
import { useShoppingCart } from "use-shopping-cart"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MainNav } from "@/components/MainNav"
import { ThemeToggle } from "@/components/ThemeToggle"

export function SiteHeader() {
  const pathname = usePathname()
  const router  =  useRouter()
  const searchParams = useSearchParams()
  const { cartCount }  = useShoppingCart()

  const defaultSearchQuery = searchParams.get("search") ?? ""

  if(pathname.startsWith("/studio")) return null

  function onSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget)
    const searchQuery = formData.get("search")
    router.replace(`/products?search=${searchQuery}`, {scroll: false})
    event.preventDefault()
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between space-x-4 px-6 sm:space-x-0">
        <MainNav />
        <form 
          className="md-hidden items-center lg:inline-flex"
          onSubmit={onSubmit}
        >
          <Input
            id="search"
            name="search"
            type="search"
            autoComplete="off"
            placeholder="Search products..."
            className="h-9 lg:w-[300px]"
            defaultValue={defaultSearchQuery}
          />
        </form>
        <div className="flex items-center space-x-1">
          <Link href="/cart">
            <Button size="sm" variant="ghost">
              <ShoppingBag className="h-5 w-5" />
              <span className="ml-2 text-sm font-bold">{ cartCount }</span>
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
          <div className="hidden md:flex">
            {process.env.NODE_ENV === "development" && (
              <Link href="/studio">
                <Button size="sm" variant="ghost">
                  <Edit className="h-5 w-5" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
