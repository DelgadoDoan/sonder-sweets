"use server"
import { auth } from "@/src/lib/auth"
import { headers } from "next/headers"
import { eq, and } from 'drizzle-orm';
import { db } from "@/src/db/index"
import { basketItems } from "../db/schema"
import { revalidatePath } from "next/cache"

export async function getBasketItemQuantity(productId: number) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) { throw new Error("Unauthorized") }

    const userId = session.user.id

    const quantity = await db
        .select({ quantity: basketItems.quantity })
        .from(basketItems)
        .where(and(eq(basketItems.userId, userId), eq(basketItems.productId, productId)))

    return quantity
}

export async function setBasketItemQuantity(productId: number, quantity: number) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    const userId = session?.user?.id ?? ''

    if (quantity <= 0) {
        // if quantity drops to 0, just remove the item from the basket
        await db.delete(basketItems)
            .where(and(eq(basketItems.productId, productId), eq(basketItems.userId, userId)))

        revalidatePath("/basket")
        revalidatePath("/products")
        return
    }

    await db.insert(basketItems).values({
        productId: productId,
        userId: userId,
        quantity: quantity,
    }).onConflictDoUpdate({
        target: [basketItems.userId, basketItems.productId],
        set: { quantity: quantity },
    })

    revalidatePath("/basket")
    revalidatePath("/products")
}