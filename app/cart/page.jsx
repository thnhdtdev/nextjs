"use client";

import { useSelector } from "react-redux";

export default function CartList() {
	const items = useSelector((state) => state.cart.items);

	if (!items.length) return <p>Giỏ hàng của bạn đang trống.</p>;

	return (
		<div className="max-w-5xl mx-auto py-10">
			<h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Giỏ hàng của bạn</h2>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-red-50 p-6 rounded-xl shadow">
				{items.map((item) => (
					<div
						key={item.id}
						className="bg-white rounded-lg p-4 shadow flex flex-col items-center h-full"
					>
						<img
							src={item.image}
							width={100}
							height={100}
							alt={item.title}
							className="mb-3 object-contain rounded"
						/>

						<span className="font-semibold text-base text-center mb-2">
							{item.title}
						</span>

						<span className="text-green-700 font-semibold mb-2">
							Số lượng: <b>{item.quantity}</b>
						</span>

						<div className="flex-1" />

						<span className="text-gray-600 mt-auto">
							Giá: {item.price} x {item.quantity} ={" "}
							<b>{item.price * item.quantity}</b>
						</span>

						<button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition w-full">
							Delete
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
