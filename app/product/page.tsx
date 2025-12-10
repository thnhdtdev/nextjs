import Link from "next/link";
import AddToCartButton from "@/app/components/AddToCartButton";

async function getProducts() {
    const res = await fetch("https://fakestoreapi.com/products", {
        cache: "no-store",
        method: "GET"
    });
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
}

export default async function ProductPage() {
    const products = await getProducts();

    return (
        <main>
            <h1>Product List</h1>

            <div className="grid grid-cols-4 gap-4">
                {products.map((p: any) => (
                    <div key={p.id} className="border rounded p-4 shadow">
                        <Link href={`/product/${p.id}`}>
                            <img
                                src={p.image}
                                alt={p.title}
                                className="w-full h-40 object-contain mb-2"
                            />
                            <h2 className="font-semibold text-base">{p.title}</h2>
                            <p className="text-green-700 font-bold">
                                Price: {p.price}
                            </p>
                        </Link>

                        <AddToCartButton product={p} />
                    </div>
                ))}
            </div>
        </main>
    );
}
