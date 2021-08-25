import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import cartSlice from "./Cart/cartSlice";

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromStoreage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const paymentMethodFromLocalStoreage = localStorage.getItem("paymentMethod")
  ? localStorage.getItem("paymentMethod")
  : "";

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStoreage,
    paymentMethod: paymentMethodFromLocalStoreage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};
const reducer = {
  cart: cartSlice,
};
const middleware = [thunk];

const store = configureStore({
  reducer,
  middleware,
  devTools: process.env.NODE_ENV === "development",
  preloadedState: initialState,
});

export default store;
