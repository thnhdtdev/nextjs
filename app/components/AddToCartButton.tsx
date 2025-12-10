"use client";

import { useDispatch } from "react-redux";
import { addToCart } from "@/app/store/cartSlice";

type Product = {
    id: string;
    title: string;
    price: number;
    image: string;
};

export default function AddToCartButton({ product }: { product: Product }) {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(
            addToCart({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
            })
        );
        alert("Đã thêm vào giỏ hàng");
    };

    return (
        <button onClick={handleAddToCart} className="bg-green-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition w-full">
            Add to Cart
        </button>
    );
}
