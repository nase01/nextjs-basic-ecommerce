import { defineType } from "sanity"

export const productPlaylist = defineType({
	name: "productPlaylist",
	title: "Product Playlist",
	type: "document",
	fields: [
		{
			name: "title",
			title: "Title",
			type: "string",
			validation: (Rule: any) => Rule.required(),
		},
		{
			name: "products",
			title: "Products",
			type: "array",
			of: [
				{
					type: "reference",
					to: [{ type: "product" }],
				},
			],
		},
	],
})