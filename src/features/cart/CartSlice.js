import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  Total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find((i) => i.name === item.name);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
      state.Total += Number(item.price);
    },
    removeFromCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find((i) => i.name === item);
      if (!existing) {
        alert("Invalid Operation");
        return;
      }
      state.Total -= Number(existing.price);
      if (existing.quantity === 1) {
        state.items = state.items.filter((i) => i.name !== item);
      } else {
        existing.quantity -= 1;
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.price = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
