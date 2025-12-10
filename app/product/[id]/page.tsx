import AddToCartButton from "@/app/components/AddToCartButton";


async function getProduct(id: string) {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
        cache: "no-store",
        method: "GET"
    });

    if (!res.ok) throw new Error("Failed to fetch product");
    return res.json();
}

export default async function ProductPage({params,}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const product = await getProduct(id);

    return (
        <main>
            <h1>{product.title}</h1>
            <img
                src={product.image}
                alt={product.title}
            />
            <p>Price: {product.price}</p>
            <p>{product.description}</p>

            <AddToCartButton product={product} />

        </main>
    )
}

