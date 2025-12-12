"use client";

import Link from "next/link";
import CartSheet from "@/components/cartSheet";

export default function CartList() {
	return (
		<header className="w-full bg-white shadow px-6 py-4 flex items-center justify-between">
			<h1 className="text-xl font-bold">My Shop</h1>

			<nav className="flex gap-6">
				<Link href="/" className="hover:text-blue-600">
					Home
				</Link>
				<Link href="/product" className="hover:text-blue-600">
					Products
				</Link>
				<Link href="/pokemon" className="hover:text-blue-600">
					Pokemon
				</Link>
				<Link href="/cart" className="hover:text-blue-600">
					Cart
				</Link>
				<CartSheet />
			</nav>
		</header>
	);
}
