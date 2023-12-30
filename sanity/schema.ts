import { type SchemaTypeDefinition } from "sanity"
import { product } from "./schemas/product.schema"
import { heroCarousel } from "./schemas/hero-carousel.schema"
import { productPlaylist } from "./schemas/product-playlist.schema"


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, heroCarousel, productPlaylist],
}
