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
        <button onClick={handleAddToCart}>
            Add to Cart
        </button>
    );
}
