import { env } from "@/env";
import { STRIPE_WEBHOOK_EVENTS } from "@/lib/constants";
import { stripe } from "@/lib/stripe";
import { db } from "@/server/db";
import { productsToCarts, users } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  const sig = request.headers.get("stripe-signature");
  const body = await request.text();

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig ?? "",
      env.STRIPE_ENDPOINT_SECRET,
    );
  } catch (err: any) {
    return Response.json({
      err,
      status: 400,
    });
  }

  if (event.type === STRIPE_WEBHOOK_EVENTS.CHARGE_SUCCEEDED) {
    const chargeSucceeded = event.data.object;
    try {
      const user = await db.query.users.findFirst({
        where: eq(users.email, chargeSucceeded.billing_details.email as string),
      });
      await db
        .delete(productsToCarts)
        .where(eq(productsToCarts.cartId, user?.cartId as number));
      return Response.json({ success: chargeSucceeded, status: 200 });
    } catch (error) {
      return Response.json({
        error,
        status: 500,
      });
    }
  }
}
