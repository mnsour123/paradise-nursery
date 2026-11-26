import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // each item: { name, image, cost, quantity }
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add a plant, or increase its quantity if it is already in the cart
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existing = state.items.find((item) => item.name === name);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },
    // Remove a plant from the cart by name
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.name !== action.payload);
    },
    // Set a plant's quantity (removes it if quantity drops below 1)
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const existing = state.items.find((item) => item.name === name);
      if (existing) {
        if (quantity < 1) {
          state.items = state.items.filter((item) => item.name !== name);
        } else {
          existing.quantity = quantity;
        }
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;
