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
  },
});

export const { addToCart } = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;
