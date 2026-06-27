import { db } from "@/src/db/index"
import { products } from "@/src/db/schema"
import ProductCard from "@/src/components/product-card"

export default async function ProductsPage() {
    const allProducts = await db.select().from(products)

    return(
        <>
            <h1>This is the products page</h1>
            <br />
            <ul>
                {allProducts.map((product) => (
                    <li key={product.id}>
                        <ProductCard 
                            productName={product.productName}
                            description={product.description}
                            price={Number(product.price)}
                            stock={product.stock}
                            imageUrl={product.imageUrl}
                        />
                        <br />
                    </li>
                ))}
            </ul>
        </>
    )
}