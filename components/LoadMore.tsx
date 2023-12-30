"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useInView } from "react-intersection-observer"
import { fetchProducts } from "@/sanity/actions/product-actions"
import { SanityProduct } from "@/config/inventory"

interface Props {
  filter: any
  order: any
}

function LoadMore({filter, order}: Props) {
	const { ref, inView } = useInView();
	const [data, setData] = useState<SanityProduct[]>([])

	useEffect(() => {
		if(inView) {
			fetchProducts(filter, order)
				.then((res) => {
					setData([...data, ...res])
				})
		}
	}, [inView, data])

  return (
    <>
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          <Image
            src="./spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
    </>
  );
}

export default LoadMore;