"use server";

import { getProductById } from "@/lib/drizzle/product";
import { getCategoryById } from "@/lib/drizzle/category";
import { stripe } from "@/lib/stripe";
import {
  type Category,
  type Product,
  type ProductToCart,
} from "@/server/db/schema";
import { currentUser } from "@clerk/nextjs";
import { getCldImageUrl } from "next-cloudinary";

export async function createSessionAction(
  productsToCarts: ProductToCart[],
  host: string,
) {
  if (productsToCarts.length === 0) {
    return {
      error: {
        message: "Ingrese productos al carrito para proceder a la compra",
      },
    };
  }

  try {
    const user = await currentUser();
    const products = [];

    for (const { productId } of productsToCarts) {
      const product = await getProductById(productId as number);
      if (product) products.push(product);
    }

    const success = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: user?.emailAddresses[0]?.emailAddress,
      line_items: products.map((product) => ({
        quantity: 1,
        price_data: {
          currency: "mxn",
          product_data: {
            name: `Diadema de ${product.category.name}`,
            description: product.description,
            images: [
              getCldImageUrl({
                src: product.cloudinaryImageId,
                width: 400,
                height: 400,
                crop: "thumb",
                gravity: "center",
              }),
            ],
          },
          unit_amount: product.price * 100, //Amount must be in cents,
        },
      })),
      mode: "payment",
      cancel_url: `${host}`,
      success_url: `${host}/success`,
    });
    return {
      success,
    };
  } catch (err) {
    return {
      error: {
        message: "Algo salió mal, intente nevamente",
      },
    };
  }
}
