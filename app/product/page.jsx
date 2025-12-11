"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import AddToCartButton from "@/components/addToCartButton";

async function getProducts() {
	const res = await fetch("https://fakestoreapi.com/products");
	if (!res.ok) throw new Error("Failed to fetch products");
	return res.json();
}

export default function ProductPage() {
	const { data, isLoading } = useQuery({
		queryKey: ["products"],
		queryFn: getProducts
	});

	if (isLoading) return <p>Loading...</p>;

	return (
		<main className="min-h-screen bg-gray-50 p-8">
			<h1 className="text-6xl font-bold underline text-center mb-10">Product List</h1>
			<div className="grid grid-cols-6 gap-6">
				{data?.map((p) => (
					<div
						key={p.id}
						className="border rounded-lg bg-white p-4 shadow hover:shadow-lg transition flex flex-col"
					>
						<Link
							href={`/product/${p.id}`}
							className="flex-1 flex flex-col items-start"
						>
							<img
								src={p.image}
								alt={p.title}
								className="w-full h-40 object-contain mb-3   p-2"
							/>
							<h2 className="font-semibold text-base line-clamp-1">{p.title}</h2>
							<h4 className="capitalize">{p.category}</h4>

							<div className="flex items-center mt-2">
								{Array.from({ length: 5 }).map((_, i) => (
									<span key={i}>
										{i < Math.floor(p.rating.rate) ? (
											<Star size={16} fill="#ffd700" color="#ffd700" />
										) : (
											<Star color="#ffd700" size={16} />
										)}
									</span>
								))}
								<span className="ml-2 text-sm text-gray-500">
									({p.rating.count} review)
								</span>
							</div>
						</Link>

						<div className="flex flex-1 justify-between items-center">
							<p className="text-green-600 font-bold ">${p.price}</p>
							<div className="flex gap-2">
								<AddToCartButton product={p} />
							</div>
						</div>
					</div>
				))}
			</div>
		</main>
	);
}
