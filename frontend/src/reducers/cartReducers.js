// import axios from "axios";
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  CART_ADD_ITEM,
  CART_ITEMS_RESET,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstant";

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action,
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existsItem = state.cartItems.find(
        (cartitem) => cartitem.product === item.product,
      );
      if (existsItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((cartitem) =>
            cartitem.product === existsItem.product ? item : cartitem,
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload,
        ),
      };

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case CART_ITEMS_RESET:
      return {};

    default:
      return state;
  }
};

/// using redux toolkit

// const initialState = {
//   cartItems: [],
//   shippingAddress: {},
// };

// const reducers = {
//   addItemToCart(state, action) {
//     const item = action.payload;
//     const existsItem = state.cartItems.find((cartitem) => cartitem.product === item.product);
//     if (existsItem) {
//       state.cartItems = state.cartItems.map((cartitem) => (cartitem.product === existsItem.product ? item : cartitem));
//     } else {
//       state.cartItems.push(item);
//     }
//   },
//   removeItemFromCart(state, action) {
//     state.cartItems = state.cartItems.filter((item) => item.product !== action.payload);
//   },
//   saveShippingAddress(state, action) {
//     state.shippingAddress = action.payload;
//   },
//   resetCartItems(state, action) {
//     state.cartItems = [];
//   },
// };

// const extraReducers = {
//   [addToCartAsync.fulfilled]: (state, action) => {
//     console.log(state, action);
//   },
// };

// export const addToCartAsync = createAsyncThunk(CART_ADD_ITEM, async (args, thunkAPI) => {
//   const { data } = await axios.get(`/api/products/${args.id}`);
//   thunkAPI.dispatch(
//     addItemToCart({
//       product: data._id,
//       name: data.name,
//       image: data.image,
//       price: data.price,
//       countInStock: data.countInStock,
//       qty: args.qty,
//     }),
//   );
//   localStorage.setItem("cartItems", JSON.stringify(thunkAPI.getState().cart.cartItems));
// });
// export const addToCart = (id, qty) => async (dispatch, getState) => {
//   const { data } = await axios.get(`/api/products/${id}`);
//   dispatch({
//     type: CART_ADD_ITEM,
//     payload: {
//       product: data._id,
//       name: data.name,
//       image: data.image,
//       price: data.price,
//       countInStock: data.countInStock,
//       qty,
//     },
//   });

//   localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
// };

// export const cartSlice = createSlice(initialState, reducers, extraReducers);

// export const { addItemToCart, removeItemFromCart, incrementByAmount } = cartSlice.actions;
// export default cartSlice.reducer;
