"use client";

import { useEffect, useState } from "react";
import Container from "./container";
import ProductCard from "./product-card";
import { Product } from "@/server/db/schema";
import { getProductsAction } from "@/actions/products-actions";
import { PRODUCTS_PER_PAGE } from "@/lib/constants";
import Pagination from "./pagination";
import { Skeleton } from "./ui/skeleton";

export default function ProductsContainer() {
  const [products, setProducts] = useState<Product[]>();
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProductsAction(true, PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE)
      .then((prods) => setProducts(prods))
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <Container className="grid justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {loading
        ? new Array(PRODUCTS_PER_PAGE)
            .fill(0)
            .map((_, i) => (
              <Skeleton
                aria-hidden
                key={i}
                className="h-[492px] w-[308px] rounded-lg"
              />
            ))
        : products?.map(
            ({ cloudinaryImageId, description, id, price, categories }) => (
              <ProductCard
                key={id}
                id={id}
                cloudinaryImageId={cloudinaryImageId}
                description={description}
                price={price}
                categories={categories}
              />
            ),
          )}
      <Pagination changePage={setPage} page={page} />
    </Container>
  );
}
