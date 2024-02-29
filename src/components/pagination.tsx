import { getProductsQuantityAction } from "@/actions/products-actions";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { PRODUCTS_PER_PAGE } from "@/lib/constants";
import { Skeleton } from "./ui/skeleton";

interface Props {
  changePage: Dispatch<SetStateAction<number>>;
  page: number;
}

export default function Pagination({ changePage, page }: Props) {
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductsQuantityAction()
      .then((length) => setPages(Math.ceil((length ?? 1) / PRODUCTS_PER_PAGE)))
      .finally(() => setLoading(false));
  }, []);

  const handlePreviousPage = () => {
    if (page === 0) {
      changePage(pages - 1);
    } else {
      changePage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (page === pages - 1) {
      changePage(0);
    } else {
      changePage((prev) => prev + 1);
    }
  };

  return (
    <nav className="col-span-full flex items-center justify-center gap-2">
      {loading ? (
        <Skeleton aria-hidden className="h-[40px] w-[220px]" />
      ) : (
        <>
          <Button onClick={handlePreviousPage} title="Página anterior">
            <ChevronLeftIcon />
          </Button>
          {new Array(pages).fill(0).map((_, i) => (
            <Button
              key={i}
              variant="secondary"
              onClick={() => changePage(i)}
              title={`Ir a la página ${i + 1}`}
            >
              {i + 1}
            </Button>
          ))}
          <Button onClick={handleNextPage} title="Página siguiente">
            <ChevronRightIcon />
          </Button>
        </>
      )}
    </nav>
  );
}
