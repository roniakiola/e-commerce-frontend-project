import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { CartItem } from '../../interfaces/CartItem';

const initialState: {
  cartItems: CartItem[];
} = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const cartItem = state.cartItems.find(
        (item) => item.product.id === action.payload.product.id
      );
      if (cartItem) {
        cartItem.amount += action.payload.amount;
      } else {
        state.cartItems.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<CartItem>) => {
      const cartItem = state.cartItems.find(
        (item) => item.product.id === action.payload.product.id
      );
      if (cartItem) {
        cartItem.amount -= action.payload.amount;
        if (cartItem.amount <= 0) {
          state.cartItems = state.cartItems.filter(
            (item) => item.product.id !== action.payload.product.id
          );
        }
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;
