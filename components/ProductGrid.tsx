"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { urlForImage } from "@/sanity/lib/image"
import { XCircle } from "lucide-react"
import { formatCurrencyString } from "use-shopping-cart"

import { SanityProduct } from "@/config/inventory"
import { shimmer, toBase64 } from "@/lib/image"
import { useInView } from "react-intersection-observer"
import { fetchProducts } from "@/sanity/actions/product-actions"

import { motion } from "framer-motion"

interface Props {
  products: SanityProduct[]
  className: string
  filter?: { }
  order?: { }
}

let page: number

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export function ProductGrid({products, className, filter, order }: Props) {
  
  const { ref, inView } = useInView();
	const [data, setData] = useState<SanityProduct[]>(products)
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    setData(products) //Initial data (page 1)
    page = 2
  }, [filter, order])

  useEffect(() => {
		if(inView && filter && order) {
      
      setIsLoading(true)
			
      // Fetch more data for infinite scrolling
      fetchProducts(filter, order, page).then((res) => {
        if(res.length > 0) {
          setData([...data, ...res])
          page++
        }
      }).finally(() => {
        setIsLoading(false)
      })
		}
	}, [inView])

  if (products.length === 0) {
    return (
      <div className="mx-auto grid h-40 w-full place-items-center rounded-md border-2 border-dashed bg-gray-50 py-10 text-center dark:bg-gray-900">
        <div>
          <XCircle className="mx-auto h-10 w-10 text-gray-500 dark:text-gray-200" />
          <h1 className="mt-2 text-xl font-bold tracking-tight text-gray-500 dark:text-gray-200 sm:text-2xl">
            No products found
          </h1>
        </div>
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-1 gap-x-6 gap-y-10 ${className} lg:gap-x-8`}>
      {data.map((product, index) => (
        <motion.div 
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{
            delay: 0.25,
            ease: 'easeInOut',
            duration: 0.1
          }}
          viewport={{ amount: 0 }}
          key={product._id}
        >
          <Link href={`/products/${product.slug}`} className="group text-sm">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg border-2 
            border-gray-200 bg-gray-100 group-hover:opacity-75 dark:border-gray-800">
              <Image
                placeholder="blur"
                blurDataURL={`data:image/svg+xml:base64,${toBase64(
                  shimmer(225, 280)
                )}`}
                src={urlForImage(product.images[0]).url()}
                alt={product.name}
                width={225}
                height={280}
                className="h-full w-full object-cover object-center 
                transition-transform hover:scale-110"
              />
            </div>
            <h3 className="mt-4 font-medium">{product.name}</h3>
            <p className="mt-2 font-medium">{formatCurrencyString({
              currency: product.currency,
              value: product.price
            })}</p>
          </Link>
        </motion.div>
      ))}
      {filter && order && (
        <div className={`flex ${className} h-40 w-full justify-center items-center`}>
          <div ref={ref}>
            {isLoading && (
              <Image
                src="./spinner.svg"
                alt="spinner"
                width={56}
                height={56}
                className="object-contain -mt-20"
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
