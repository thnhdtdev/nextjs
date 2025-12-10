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
        <main className="min-h-screen bg-gray-50 p-8">
            <h1 className="text-6xl font-bold underline text-center mb-10">
                Product List
            </h1>
            <div className="grid grid-cols-4 gap-6">
                {products.map((p: any) => (
                    <div
                        key={p.id}
                        className="border rounded-lg bg-white p-4 shadow hover:shadow-lg transition flex flex-col"
                    >
                        <Link href={`/product/${p.id}`} className="flex-1 flex flex-col items-center">
                            <img
                                src={p.image}
                                alt={p.title}
                                className="w-full h-40 object-contain mb-3"
                            />
                            <h2 className="font-semibold text-base text-center line-clamp-2">{p.title}</h2>
                            <p className="text-green-700 font-bold mt-2">
                                Price: {p.price}
                            </p>
                        </Link>
                        <div className="mt-4">
                            <AddToCartButton product={p} />
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
