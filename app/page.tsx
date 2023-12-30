import HeroCarousel from "@/components/HeroCarousel"
import { ProductGrid } from "@/components/ProductGrid"
import { SanityProduct } from "@/config/inventory"
import { cn } from "@/lib/utils"
import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { fetchPlaylist, fetchNewArrivals } from  "@/sanity/actions/product-actions"

export default async function Page() {

  const carouselData = await client.fetch(
    groq`*[_type == "heroCarousel"] {
      _id,
      _createdAt,
      name,
      description,
      "image": image.asset->url
    }`
  );

  const newArrivals = await fetchNewArrivals()

  const productPlaylist = await fetchPlaylist()

  return (
    <div>
      <div className="mx-auto flex max-w-6xl items-center justify-between space-x-4 sm:space-x-0 md:px-6 md:pt-2">
        <HeroCarousel carouselData={carouselData} />
      </div>
      <div>
        <main className="mx-auto max-w-6xl pt-4 px-6">

          <section className="pb-10">
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-xl tracking-tight sm:text-2xl">
                Newest
              </h2>
              <Link href="/products">
                <Button size="sm" className="text-white bg-main hover:bg-main/90 focus:outline-none focus:ring-2 focus:ring-violet-500">
                  All Products
                </Button>
              </Link>
            </div>
            <div aria-labelledby="products-heading" className="pt-6">
              <div className={cn("grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4",
                newArrivals.length > 0 ? "lg:grid-cols-4" : "lg:grid-cols-[1fr_3fr]"
              )}>
                <ProductGrid className="sm:grid-cols-4 lg:col-span-4" products={newArrivals} />
              </div>
            </div>
          </section>

          {productPlaylist.map((item: any, index: number) => (
            <section className="pb-10" key={index}>
              <h2 className="text-xl tracking-tight sm:text-2xl border-b pb-4">
                {item.title}
              </h2>
              <div aria-labelledby="products-heading" className="pt-6">
                <div className={cn("grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4",
                  item.products.length > 0 ? "lg:grid-cols-4" : "lg:grid-cols-[1fr_3fr]"
                )}>
                  <ProductGrid className="sm:grid-cols-4 lg:col-span-4" products={item.products} />
                </div>
              </div>
            </section>
          ))}

        </main>
      </div>
    </div>
  )
}
