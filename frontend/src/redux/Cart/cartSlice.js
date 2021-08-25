import { createSlice } from "@reduxjs/toolkit";
import { AddToCartAsync, removeItemAsync, savePaymentMethod, saveShippingAddress } from "./cartAsyncActions";

const name = "Cart Slice";
const initialState = {
  cartItems: [],
  shippingAddress: {},
  paymentMethod: {},
};
const reducers = {
  addToCart(state, action) {
    const item = action.payload;
    const existingItem = state.cartItems.find((cartitem) => cartitem.product === item.product);
    if (existingItem) {
      state.cartItems = state.cartItems.map((cartItem) =>
        cartItem.product === existingItem.product ? item : cartItem,
      );
    } else {
      state.cartItems.push(item);
    }
  },
  removeItem(state, action) {
    state.cartItems = state.cartItems.filter((item) => item.product !== action.payload);

    localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
  },
  setShippingAddress(state, action) {
    state.shippingAddress = action.payload;
    localStorage.setItem("shippingAddress", JSON.stringify(action.payload));
  },
  setPaymentMethod(state, action) {
    state.paymentMethod = action.payload;
  },
  resetCart(state) {
    state.cartItems = [];
    state.shippingAddress = {};
    state.paymentMethod = {};
  },
};
const extraReducers = {
  [AddToCartAsync.fulfilled]: (state, action) => {
    addToCart(action.payload);
    localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
  },
  [removeItemAsync.fulfilled]: (state, action) => {
    removeItem(action.payload);
    localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
  },
  [saveShippingAddress.fulfilled]: (state, action) => {
    setShippingAddress(action.payload);
    localStorage.setItem("shippingAddress", JSON.stringify(state.shippingAddress));
  },
  [savePaymentMethod.fulfilled]: (state, action) => {
    setPaymentMethod(action.payload);
    localStorage.setItem("paymentMethod", state.paymentMethod);
  },
};
const cartSlice = createSlice({
  name,
  initialState,
  reducers,
  extraReducers,
});

const { addToCart, removeItem, setShippingAddress, setPaymentMethod } = cartSlice.actions;

export const { resetCart } = createSlice.actions;

export default cartSlice.reducer;
