import Link from "next/link"
import Image from "next/image"

import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"

export function MainNav() {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <Image width="35" height="35" src="/logo.png" alt="logo" />
        <span className="hidden md:inline-block text-xl font-bold text-main mt-2">
          {siteConfig.name}
        </span>
      </Link>
    </div>
  )
}
