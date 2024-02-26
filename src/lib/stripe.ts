import { env } from "@/env";
import { type Stripe as TStripe, loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";

let stripePromise: Promise<TStripe | null>;
export function getStripe() {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
}

export const stripe = new Stripe(env.STRIPE_SECRET_KEY);
