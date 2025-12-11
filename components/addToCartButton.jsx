"use client";

import { toast } from "sonner";
import { useDispatch } from "react-redux";

import { addToCart } from "@/store/cartSlice";
import { Button } from "@/src/components/ui/button";

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
        toast("Đã thêm vào giỏ hàng");
    };

    return (
        <Button variant="outline" onClick={handleAddToCart}>
            Thêm vào giỏ hàng
        </Button>
    );
}
