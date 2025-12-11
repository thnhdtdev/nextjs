import { toast } from "sonner";

import AddToCartButton from "@/components/addToCartButton";

async function getProduct(id) {
	const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
		cache: "no-store",
		method: "GET"
	});

	if (!res.ok) throw new Error("Failed to fetch product");
	return res.json();
}

export default async function ProductPage({ params }) {
	const { id } = await params;
	const product = await getProduct(id);

	return (
		<main className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
			<div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
				<h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
					{product.title}
				</h1>
				<div className="flex flex-col md:flex-row items-center gap-8">
					<img
						src={product.image}
						alt={product.title}
						className="w-60 h-60 object-contain bg-gray-100 rounded-xl shadow mb-4 md:mb-0"
					/>
					<div className="flex-1">
						<p className="text-green-700 text-2xl font-semibold mb-2">
							{product.price}
						</p>
						<p className="text-gray-700 mb-6">{product.description}</p>

						<AddToCartButton product={product} />
					</div>
				</div>
			</div>
		</main>
	);
}
