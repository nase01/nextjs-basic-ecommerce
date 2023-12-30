import { defineType, defineField } from "sanity";

export const heroCarousel = defineType({
	name: "heroCarousel",
	title: "Hero Carousel",
	type: "document",
	fields: [
		defineField({
			name: "name",
			title: "Name",
			type: "string",
		}),
		{
			name: "description",
			title: "Description",
			type: "string"
		},
		{
			name: "image",
			title: "Image",
			type: "image"
		}
	]
})
