"use client";

import * as React from "react";
import { ShoppingCart, Trash2, Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from "@/components/ui/sheet";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "@/store/cartSlice";
import { toast } from "sonner";
import { DialogDelete } from "@/components/dialogDelete";

export default function CartSheet() {
	const dispatch = useDispatch();
	const items = useSelector((state) => state.cart.items);

	const handleRemove = (id) => {
		dispatch(removeFromCart(id));
		toast.success("Deleted from cart successfully");
	};

	const totalAmount = items?.reduce((acc, item) => acc + item.quantity * item.price, 0) ?? 0;

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					className="group hover:bg-green-500 transition-colors relative"
					size="sm"
					variant="ghost"
				>
					<ShoppingCart className="text-green-600 group-hover:text-white transition-colors" />
					<span className="absolute top-0 right-0 h-2 w-2 rounded-full text-green-600">
						{items.length}
					</span>
				</Button>
			</SheetTrigger>

			<SheetContent side="right" className="w-full sm:max-w-md flex flex-col">
				<SheetHeader>
					<SheetTitle>Giỏ hàng ({items.length})</SheetTitle>
					<SheetDescription>Miễn phí vận chuyển cho đơn từ 500k</SheetDescription>
				</SheetHeader>

				{items.map((item) => (
					<div className="flex items-start gap-4">
						<div className="h-20 w-20 bg-gray-100 rounded-md flex items-center justify-center text-xs text-gray-500 shrink-0">
							<img
								src={item.image}
								width={64}
								height={64}
								alt={item.title}
								className="h-16 w-16 object-contain mx-auto"
							/>
						</div>
						<div className="flex-1 space-y-1">
							<h3 className="font-semibold text-sm leading-none"> {item.title}</h3>
							<div className="font-bold text-green-700 text-sm pt-1">
								${item.quantity * item.price}
							</div>
						</div>
						<div className="flex flex-col items-end gap-2">
							<DialogDelete onClick={() => handleRemove(item.id)} />

							<div className="flex items-center border rounded-md">
								<span className="w-7 text-center text-xs font-medium">2</span>
							</div>
						</div>
					</div>
				))}

				<SheetFooter className="pt-2 border-t mt-auto sm:flex-col sm:space-x-0">
					<div className="flex justify-between items-center mb-4 w-full">
						<span className="text-muted-foreground text-sm">Tạm tính:</span>
						<span className="text-lg font-bold text-gray-900">${totalAmount}</span>
					</div>

					<div className="grid gap-3 w-full">
						<Button className="w-full bg-green-600 hover:bg-green-700 h-11 text-base shadow-md">
							Thanh toán ngay
						</Button>
						<SheetClose asChild>
							<Button variant="outline" className="w-full">
								Tiếp tục mua sắm
							</Button>
						</SheetClose>
					</div>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
