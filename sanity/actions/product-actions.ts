import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"
import { SanityProduct } from "@/config/inventory"

export const fetchProducts = async (filter: any, order: any, page: number = 1) => {
	try {

		const pageSize = 6
		const skip = (page - 1) * pageSize;

    const response = await client.fetch<SanityProduct[]>(
			groq`${filter} ${order} {
				_id,
				_createdAt,
				name,
				sku,
				images,
				currency,
				price,
				description,
				"slug": slug.current
			}[${skip}...${skip + pageSize}]`
		);
	
		return response

	} catch (error) {
    console.error("Error fetching products:", error)

    throw error
  }
}


export const fetchPlaylist = async () => {
	try {
		const response = await client.fetch(
			groq`*[_type == "productPlaylist"]{
				_id,
				title,
				products[0...4]->{
					_id,
					_createdAt,
					name,
					sku,
					images,
					currency,
					price,
					description,
					"slug": slug.current
				}
			}`
		)

		return response

	} catch (error) {
		console.error("Error fetching products:", error)

    throw error
	}
}

export const fetchNewArrivals = async () => {
	try {
		const response = await client.fetch<SanityProduct[]>(
			groq`*[_type == "product"] | order(_createdAt desc) [0...4]{
				_id,
				_createdAt,
				name,
				sku,
				images,
				currency,
				price,
				description,
				"slug": slug.current
			}`
		);

		return response
	} catch (error) {
		console.error("Error fetching products:", error)

    throw error
	}
}
