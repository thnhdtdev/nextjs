"use client";

import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function CartList() {
    const items = useSelector((state: RootState) => state.cart.items);

    if (!items.length) return <p>Giỏ hàng của bạn đang trống.</p>;

    return (
        <div>
            <h2>Giỏ hàng của bạn</h2>

            <div className="grid grid-cols-4 gap-4 bg-red-500 p-4">
                {items.map(item => (
                        <div key={item.id} style={{ marginBottom: 12 }}>
                            <img src={item.image} width={100} height={100} alt={item.title}/>
                            <span>{item.title}</span>
                            <span>Số lượng: {item.quantity}</span>
                            <span>Giá: {item.price} x {item.quantity} = <b>{item.price * item.quantity}</b></span>
                        </div>
                    ))}
            </div>

        </div>
        );
    }
