"use client";

import { ShoppingBag } from "lucide-react";
import SubmitButton from "../submit-button";
import { addToCartAction } from "@/actions/cart-actions";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

export default function AddToCart({ id }: { id: number }) {
  const pathname = usePathname();

  const addToCart = async () => {
    const result = await addToCartAction(id, pathname);

    if (result.error) {
      toast.error(result.error, {
        style: { background: "#fff0f0", color: "red" },
      });
    } else if (result.info) {
      toast.info(result.info, {
        style: { background: "#eff8ff", color: "blue", borderColor: "#d3e0fd" },
      });
    } else {
      toast.success(result.success, {
        style: {
          background: "#ecfdf3",
          color: "green",
          borderColor: "#d3fde5",
        },
      });
    }
  };
  return (
    <form action={addToCart} className="w-full">
      <SubmitButton
        className="w-full font-bold"
        loadingText="Agregando al carrito..."
        text={
          <>
            <ShoppingBag /> Agregar al carrito
          </>
        }
      />
    </form>
  );
}
