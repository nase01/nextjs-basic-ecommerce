"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

interface Props {
  carouselData: Array<{
    _id: string;
    name: string;
    image: string;
  }>;
}

export default function HeroCarousel({ carouselData }: Props) {

  return (
    <div className="hero-carousel">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={5000}
        showArrows={true}
        showStatus={false}
      >
        {carouselData.map((item) => (
          <Image 
            src={item.image}
            alt={item.name}
            width={1653}
            height={703}
            className="object-cover"
            key={item._id}
						priority
          />
        ))}
      </Carousel>
    </div>
  )
}
