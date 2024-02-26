import { Webhook, WebhookRequiredHeaders } from "svix";
import { headers } from "next/headers";
import type { UserWebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/server/db";
import { carts, users } from "@/server/db/schema";
import { IncomingHttpHeaders } from "http";
import { eq } from "drizzle-orm";

async function handler(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  // Verify the payload with the headers
  try {
    const evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    } as IncomingHttpHeaders & WebhookRequiredHeaders) as UserWebhookEvent;

    //Create user (if doesn't exist) and user's cart

    const userExists = await db.query.users.findFirst({
      where: eq(
        users.email,
        evt.data.email_addresses[0]?.email_address as string,
      ),
    });

    if (!userExists) {
      const { insertId: userId } = await db.insert(users).values({
        clerkId: evt.data.id as string,
        email: evt.data.email_addresses[0]?.email_address as string,
        firstName: evt.data.first_name as string,
        lastName: evt.data.last_name as string,
        profileImage: evt.data.image_url as string,
      });

      const { insertId: cartId } = await db
        .insert(carts)
        .values({ userId: Number(userId) });

      //Asign cart to user
      await db
        .update(users)
        .set({ cartId: Number(cartId) })
        .where(eq(users.id, Number(userId)));
    }
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  return new Response("", { status: 200 });
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
