import { db } from "@/src/db/index"
import { products } from "@/src/db/schema"
import ProductCard from "@/src/components/product-card";


export default async function HomePage() {
    const allProducts = await db.select().from(products).limit(3);

    return(
        <>
            <div className="max-w-6xl mx-auto px-6 mt-24 mb-24">
                <div className="mb-10 flex flex-col items-center text-center">
                    <h1 className="text-xl md:text-4xl font-bold tracking-tight text-[#4b3123]">
                        Our Top Picks
                    </h1>
                    <div className="mt-5 h-px w-full max-w-md bg-neutral-200" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-items-center">
                    {allProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            productName={product.productName}
                            description={product.description}
                            price={Number(product.price)}
                            stock={product.stock}
                            imageUrl={product.imageUrl}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}