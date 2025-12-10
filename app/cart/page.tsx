"use client";

import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function CartList() {
    const items = useSelector((state: RootState) => state.cart.items);

    if (!items.length) return <p>Giỏ hàng của bạn đang trống.</p>;

    return (
        <div>
            <h2>Giỏ hàng của bạn</h2>
            <ul>
                {items.map(item => (
                    <li key={item.id} style={{ marginBottom: 12 }}>
                        <img src={item.image} width={50} style={{ verticalAlign: 'middle' }} />
                        <span style={{ marginLeft: 12, fontWeight: 600 }}>{item.title}</span>
                        <span style={{ marginLeft: 12 }}>Số lượng: {item.quantity}</span>
                        <span style={{ marginLeft: 12 }}>Giá: {item.price} x {item.quantity} = <b>{item.price * item.quantity}</b></span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
