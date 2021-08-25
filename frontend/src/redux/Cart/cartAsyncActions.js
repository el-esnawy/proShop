import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const AddToCartAsync = createAsyncThunk(
  "cart/AddItemToCart",
  async (payload) => {
    const { data } = await axios.get(`/api/products/${payload.id}`);

    return {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty: payload.qty,
    };
  },
);

export const removeItemAsync = createAsyncThunk(
  "cart/removeItemFromCart",
  (payload) => {
    return payload.data;
  },
);

export const saveShippingAddress = createAsyncThunk(
  "cart/saveShippingAddress",
  (payload) => {
    return payload.data;
  },
);

export const savePaymentMethod = createAsyncThunk(
  "cart/savePaymentMethod",
  (payload) => {
    return payload.data;
  },
);
