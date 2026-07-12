import BasketItemCard from "@/src/components/basket-item-card"
import { db } from "@/src/db"
import { basketItems, products } from "@/src/db/schema"
import { auth } from "@/src/lib/auth"
import { eq } from "drizzle-orm"
import { headers } from "next/headers"
import Link from "next/link"

export default async function BasketPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const userId = session?.user?.id ?? "";

    const allUserBasketItems = await db
        .select({
            id: basketItems.id,
            quantity: basketItems.quantity,
            price: products.price,
            stock: products.stock,
            imageUrl: products.imageUrl,
            productId: products.id,
            productName: products.productName,
        })
        .from(basketItems)
        .innerJoin(products, eq(basketItems.productId, products.id))
        .where(eq(basketItems.userId, userId));

    return (
        <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="mb-10">
                <h1 className="text-4xl md:text-5xl font-serif tracking-tight text-[#4b3123]">
                    My Basket
                </h1>
                <p className="mt-2 text-neutral-500">
                    Review your items before checking out.
                </p>
                <div className="mt-5 h-px w-full bg-neutral-200" />
            </div>

            {allUserBasketItems.length > 0 ? (
                <div className="flex flex-col items-center gap-6">
                    {allUserBasketItems.map((basketItem) => (
                        <BasketItemCard
                            key={basketItem.id}
                            productId={basketItem.productId}
                            productName={basketItem.productName}
                            price={Number(basketItem.price)}
                            initialQuantity={basketItem.quantity} // for now
                            stock={basketItem.stock}
                            imageUrl={basketItem.imageUrl}
                        />
                    ))}
                </div>
            ) : (
                <div className="rounded-3xl border border-dashed border-neutral-300 py-20 text-center">
                    <h2 className="text-2xl mb-4 font-semibold text-[#4b3123]">
                        Your basket is empty
                    </h2>
                    <Link href="/products" className="text-neutral-500">
                        Click here to get started.
                    </Link>
                </div>
            )}
        </div>
    );
}