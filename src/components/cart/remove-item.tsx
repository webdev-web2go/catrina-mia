"use client";

import { removeFromCartAction } from "@/actions/cart-actions";
import { Trash2Icon } from "lucide-react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import SubmitButton from "../submit-button";
import { cn } from "@/lib/utils";

export default function RemoveFromCart({ id }: { id?: number }) {
  const pathname = usePathname();

  const removeFromCart = async () => {
    const result = await removeFromCartAction(pathname, id);
    if (result.error) {
      toast.error(result.error, {
        style: { background: "#fff0f0", color: "red" },
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
    <form
      action={removeFromCart}
      className={cn(id && "absolute -top-3 right-0")}
    >
      <SubmitButton
        loadingText=""
        className="bg-transparent p-0 text-foreground hover:bg-transparent"
        text={<Trash2Icon className="size-5" />}
        aria-label="Eliminar producto del carrito"
        title={`Eliminar ${id ? "producto" : "productos"} del carrito`}
      />
    </form>
  );
}
