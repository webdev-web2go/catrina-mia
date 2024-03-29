"use client";

import type { Product } from "@/server/db/schema";
import Container from "./container";
import ProductCard from "./product-card";
import { useEffect, useRef, useState } from "react";
import { register } from "swiper/element/bundle";
import { Button } from "./ui/button";
import {
  ArrowUpRightFromSquare,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ProductsCarousel({
  products,
  showSeeMoreLink = true,
}: {
  products: Product[];
  showSeeMoreLink?: boolean;
}) {
  const swiperRef = useRef(null);
  const [swiperLoaded, setSwiperLoaded] = useState(false);

  useEffect(() => {
    register();
    setSwiperLoaded(true);
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
    <Container className="relative">
      {!swiperLoaded ? (
        <Skeleton aria-hidden className="h-[524px] w-full rounded-lg" />
      ) : (
        <>
          {showSeeMoreLink && (
            <Button
              asChild
              variant="link"
              className="absolute -top-10 right-0 transition hover:scale-110"
            >
              <Link
                href="/tocados"
                className="flex items-center gap-1 text-base font-semibold decoration-transparent"
              >
                Ver más <ArrowUpRightFromSquare className="size-5" />
              </Link>
            </Button>
          )}
          <Button
            onClick={handlePreviousTab}
            title="Anterior"
            className={cn(
              "absolute left-[30px] top-1/2 z-50 size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full p-0 font-bold xl:left-[15px]",
              {
                hidden: products.length < 4,
                "hidden md:flex": products.length > 4,
              },
            )}
          >
            <ChevronLeftIcon className="size-8" />
          </Button>
          <Button
            onClick={handleNextTab}
            title="Siguiente"
            className={cn(
              "absolute right-6 top-1/2 z-50 size-12 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full p-0 font-bold xl:right-0",
              {
                hidden: products.length < 4,
                "hidden md:flex": products.length > 4,
              },
            )}
          >
            <ChevronRightIcon className="size-8" />
          </Button>
          {/* @ts-ignore */}
          <swiper-container
            ref={swiperRef}
            slides-per-view="auto"
            loop={products.length > 4}
            style={{
              height: "100%",
              width: "100%",
            }}
          >
            {products?.map(
              ({ cloudinaryImageId, description, id, price, categories }) => (
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
                    categories={categories}
                    isCarousel
                  />
                  {/* @ts-ignore */}
                </swiper-slide>
              ),
            )}
            {/* @ts-ignore */}
          </swiper-container>
        </>
      )}
    </Container>
  );
}
