"use client";

import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { ShoppingCart } from "lucide-react";

import { addToCart } from "@/store/cartSlice";
import { Button } from "@/components/ui/button";

export default function AddToCartButton({ product }) {
	const dispatch = useDispatch();

	const handleAddToCart = () => {
		dispatch(
			addToCart({
				id: product.id,
				title: product.title,
				price: product.price,
				image: product.image
			})
		);
		toast.success("Đã thêm vào giỏ hàng");
	};

	return (
		<Button
			className="group hover:bg-green-500 transition-colors"
			size="sm"
			variant="ghost"
			onClick={handleAddToCart}
		>
			<ShoppingCart className=" text-green-600 group-hover:text-white transition-colors" />
		</Button>
	);
}
