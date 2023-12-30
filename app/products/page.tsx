
import { cn } from "@/lib/utils"
import { ProductFilters } from "@/components/ProductFilters"
import { ProductGrid } from "@/components/ProductGrid"
import { ProductSort } from "@/components/ProductSort"
import { fetchProducts } from  "@/sanity/actions/product-actions"
import { seedSanityData } from "@/lib/seed"

interface Props {
  searchParams: {
    date?: string
    price?: string
    color?: string
    category?: string
    size?: string
    search?: string
  }
}

export default async function Page({ searchParams }: Props) {
  // await seedSanityData()
  const { date = "desc", price, color, category, size, search } = searchParams
  const priceOrder = price ? `| order(price ${price})` : ""
  const dateOrder =  date ? `| order(_createdAt ${date})` : ""
  const order = `${priceOrder}${dateOrder}`
  
  const productFilter = `_type == "product"`
  const colorFilter = color ? `&& "${color}" in colors` : ""
  const categoryFilter =  category ? `&& "${category}" in categories` : ""
  const sizeFilter =  size ? `&& "${size}" in sizes` : ""
  const searchFilter = search ?`&& name match "${search}"` : ""

  const filter = `*[
    ${productFilter}
    ${colorFilter}
    ${categoryFilter}
    ${sizeFilter}
    ${searchFilter}
  ]`

  const products = await fetchProducts(filter, order)

  return (
    <div>
      <div className="px-4 pt-20 text-center">
        <h1 className="text-4xl font-extrabold tracking-normal">Collections</h1>
        <p className="mx-auto mt-4 max-w-3xl text-base">Browse through our extensive collection of signature clothing and accessories.</p>
      </div>
      <div>
        <main className="mx-auto max-w-6xl px-6">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 pt-24 dark:border-gray-800">
            <h1 className="text-xl tracking-tight sm:text-2xl">
              {products.length} result{products.length > 1 && "s"}
            </h1>
            <ProductSort />
          </div>

          <section aria-labelledby="products-heading" className="pt-6">
            <h2 id="products-heading" className="sr-only">
              {/* For content readers only */}
              Products
            </h2>
            <div className={cn("grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4",
              products.length > 0 ? "lg:grid-cols-4" : "lg:grid-cols-[1fr_3fr]"
            )}>
              <div className="hidden lg:block"><ProductFilters /></div>
              <ProductGrid className="sm:grid-cols-3 lg:col-span-3 md:col-span-3" 
                products={products} 
                filter={filter}
                order={order}
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
