"use client";

import { Trash2 } from "lucide-react";
import { removeFromCart } from "@/store/cartSlice";

import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DialogDelete } from "@/components/dialogDelete";

export default function CartList() {
	const dispatch = useDispatch();
	const items = useSelector((state) => state.cart.items);

	const handleRemove = (id) => {
		dispatch(removeFromCart(id));
		toast.success("Deleted from cart successfully");
	};

	if (!items.length) return <p>Giỏ hàng của bạn đang trống.</p>;

	return (
		<div className="max-w-7xl bg-gray-50 flex flex-col gap-4 mx-auto ">
			<div className="bg-white rounded-xl shadow-lg p-10">
				<div className="font-bold text-4xl mb-6">Shopping cart</div>
				<div className="grid grid-cols-6 mb-4 capitalize font-bold">
					<div>Image</div>
					<div className="col-span-2">title</div>
					<div>quanlity</div>
					<div>total price</div>
					<div></div>
				</div>
				{items.map((item) => (
					<div
						key={item.id}
						className="grid grid-cols-6 items-center gap-4 rounded-xl border px-4 py-3 mb-4 bg-white shadow"
					>
						<img
							src={item.image}
							width={64}
							height={64}
							alt={item.title}
							className="h-16 w-16 object-contain mx-auto"
						/>
						<Tooltip>
							<TooltipTrigger asChild>
								<div className="flex flex-1 col-span-2 ">
									<div className="font-semibold text-base line-clamp-1">
										{item.title}
									</div>
								</div>
							</TooltipTrigger>
							<TooltipContent>{item.title} </TooltipContent>
						</Tooltip>

						<div className="flex items-center gap-2">
							<span className="w-6 text-center">{item.quantity}</span>
						</div>

						<div className="font-bold">${item.quantity * item.price}</div>
						<DialogDelete onClick={() => handleRemove(item.id)} />
					</div>
				))}
			</div>
		</div>
	);
}
