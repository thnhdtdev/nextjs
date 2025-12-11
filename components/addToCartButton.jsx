"use client";

import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

export default function AddToCartButton({ product }) {
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
        <button
            onClick={handleAddToCart}
            className="bg-green-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition w-full"
        >
            Add to Cart
        </button>
    );
}
