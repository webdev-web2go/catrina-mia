"use client";

import {
  getProductRatingAction,
  rateProductAction,
} from "@/actions/rating-actions";
import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";
import {
  useState,
  type HTMLAttributes,
  useTransition,
  useEffect,
  type MouseEvent,
} from "react";
import { toast } from "sonner";

export default function Rate({
  productId,
  ...props
}: { productId: number } & HTMLAttributes<HTMLDivElement>) {
  const [biggerIndex, setBiggerIndex] = useState(-1);
  const [rating, setRating] = useState(0);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    getProductRatingAction(productId).then((rating) => setRating(rating));
  }, []);

  const handleRateProduct = (value: number) => {
    const currentRating = rating;
    setRating(value as number);
    startTransition(async () => {
      const result = await rateProductAction(productId, value);
      if (result?.info) {
        toast.info(result.info);
      } else if (result?.error) setRating(currentRating);
    });
  };

  return (
    <div className="absolute right-2 top-2 flex gap-1" {...props}>
      {new Array(5).fill(0).map((_, i) => (
        <button
          key={i}
          disabled={isPending}
          title={`Califica el tocado con ${i + 1 !== 1 ? `${i + 1} estrellas` : `${i + 1} estrella`}`}
          onMouseEnter={() => setBiggerIndex(i)}
          onMouseLeave={() => setBiggerIndex(-1)}
          onClick={(e) => {
            handleRateProduct(i + 1);
            const currentTarget = e.currentTarget;

            currentTarget.classList.add("scale-110");

            setTimeout(() => {
              currentTarget.classList.remove("scale-110");
            }, 200);
          }}
          className="transition"
        >
          <StarIcon
            className={cn("text-white transition", {
              "fill-white":
                biggerIndex >= i || (rating >= i + 1 && biggerIndex === -1),
              "fill-transparent": biggerIndex < i && rating === 0,
            })}
          />
        </button>
      ))}
    </div>
  );
}
