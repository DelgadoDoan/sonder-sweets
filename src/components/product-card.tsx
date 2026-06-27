interface ProductCardProps {
    productName: string
    description: string
    price: number
    stock: number
    imageUrl: string
}

export default function ProductCard({ productName, description, price, stock, imageUrl }: ProductCardProps) {
  return (
    <div>
      <img src={imageUrl} alt={productName} />
      <h3>{productName}</h3>
      <p>{description}</p>
      <p>Price: ${price}</p>
      <p>Stock: {stock}</p>
    </div>
  );
}