import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { CartItem } from '../../interfaces/CartItem';

const initialState: {
  cartItems: CartItem[];
  total?: number;
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
      state.total = calculateTotal(state.cartItems);
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
      state.total = calculateTotal(state.cartItems);
    },
  },
});

const calculateTotal = (cartItems: CartItem[]): number => {
  return cartItems.reduce((total, item) => total + item.amount, 0);
};

export const { addToCart, removeFromCart } = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;
