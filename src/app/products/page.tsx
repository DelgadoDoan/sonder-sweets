
import { db } from "@/src/db/index"
import { products, basketItems } from "@/src/db/schema"
import ProductCard from "@/src/components/product-card"
import { auth } from "@/src/lib/auth"
import { headers } from "next/headers"
import { eq } from "drizzle-orm"

export default async function ProductsPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {throw new Error("Unauthorized")}

    const userId = session.user.id

    const [allProducts, allUserBasketItems] = await Promise.all([
        db.select().from(products),
        db.select().from(basketItems).where(eq(basketItems.userId, userId)),
    ]);

    return(
        <>
            {allProducts && (<div className="max-w-6xl mx-auto px-6 mt-24 mb-24">
                <div className="mb-10 flex flex-col items-center text-center">
                    <h1 className="text-4xl md:text-5xl font-serif tracking-tight text-[#4b3123]">
                        All Products
                    </h1>
                    <p className="mt-2 text-base text-neutral-500">
                        Satisfy your cravings with our yummy homemade desserts.
                    </p>
                    <div className="mt-5 h-px w-full max-w-md bg-neutral-200" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
                    {allProducts.map((product) => {
                        const userBasketItem = allUserBasketItems.find(
                            (item) => item.productId === product.id
                        );

                        return (
                            <ProductCard
                                key={product.id}
                                productId={product.id}
                                productName={product.productName}
                                description={product.description}
                                price={Number(product.price)}
                                stock={product.stock}
                                imageUrl={product.imageUrl}
                                initialQuantity={userBasketItem?.quantity ?? 0}
                            />
                        );
                    })}
                </div>
            </div>)}
        </>
    )
}