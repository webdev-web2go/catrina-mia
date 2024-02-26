"use client";

import { Button } from "../ui/button";
import { createSessionAction } from "@/actions/stripe-actions";
import { ProductToCart } from "@/server/db/schema";
import { useRouter } from "next/navigation";
import SubmitButton from "../submit-button";
import { toast } from "sonner";

export default function CheckoutButton({
  productsToCarts,
}: {
  productsToCarts: ProductToCart[];
}) {
  const router = useRouter();
  const createSession = async () => {
    const host = window.location.origin;
    const result = await createSessionAction(productsToCarts, host);

    if (result.success) router.push(result.success.url as string);
    else {
      toast.error(result.error.message, {
        style: { background: "#fff0f0", color: "red" },
      });
    }
  };
  return (
    <form action={createSession}>
      <SubmitButton
        loadingText="Proceder a la compra..."
        text="Proceder a la compra"
        className="w-full font-semibold"
      />
    </form>
  );
}
