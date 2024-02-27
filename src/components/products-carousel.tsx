"use client";

import type { Product } from "@/server/db/schema";
import Container from "./container";
import ProductCard from "./product-card";
import { useEffect, useRef } from "react";
import { register } from "swiper/element/bundle";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export default function ProductsCarousel({
  products,
}: {
  products: Product[];
}) {
  const swiperRef = useRef(null);
  useEffect(() => {
    register();
    swiperRef.current;
  }, []);
  const handleNextTab = () => {
    //@ts-ignore
    swiperRef.current?.swiper.slideNext();
  };

  const handlePreviousTab = () => {
    //@ts-ignore
    swiperRef.current?.swiper.slidePrev();
  };
  return (
    <Container className="relative cursor-grab">
      <Button
        onClick={handlePreviousTab}
        title="Anterior"
        className="absolute left-[30px] top-1/2 z-50 hidden size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full p-0 font-bold md:flex xl:left-[15px]"
      >
        <ChevronLeftIcon className="size-8" />
      </Button>
      <Button
        onClick={handleNextTab}
        title="Siguiente"
        className="absolute right-6 top-1/2 z-50 hidden size-12 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full p-0 font-bold md:flex xl:right-0"
      >
        <ChevronRightIcon className="size-8" />
      </Button>
      {/* @ts-ignore */}
      <swiper-container
        ref={swiperRef}
        slides-per-view="auto"
        loop="true"
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        {products.map(({ cloudinaryImageId, description, id, price }) => (
          // @ts-ignore
          <swiper-slide
            key={id}
            style={{
              width: "fit-content",
              marginLeft: "15px",
            }}
          >
            <ProductCard
              id={id}
              cloudinaryImageId={cloudinaryImageId}
              description={description}
              price={price}
            />
            {/* @ts-ignore */}
          </swiper-slide>
        ))}
        {/* @ts-ignore */}
      </swiper-container>
    </Container>
  );
}
