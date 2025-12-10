import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
    id: string;
    title: string;
    price: number;
    image: string;
    quantity: number;
};

type CartState = {
    items: CartItem[];
};

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<Omit<CartItem, "quantity">>) {
            const existing = state.items.find((i) => i.id === action.payload.id)
            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
    },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
