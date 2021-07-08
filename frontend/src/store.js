// import { createStore, combineReducers, applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";

import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfile,
} from "./reducers/userReducer";
import { userDetailsrReducer } from "./reducers/userReducer";

import { cartReducer } from "./reducers/cartReducers";

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
};
const reducer = {
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsrReducer,
  userUpdateProfile: userUpdateProfile,
};
const middleware = [thunk];

const store = configureStore({
  reducer,
  middleware,
  devTools: process.env.NODE_ENV !== "production",
  preloadedState: initialState,
});

export default store;

/**************** alternative way: DONE IN THE COURSE *****************/

// const reducer = combineReducers({});
// const initialState = {};
// const middleware = [thunk];

// const store = createStore(
//   reducer,
//   initialState,
//   composeWithDevTools(applyMiddleware(...middleware)),
// );

// export default store;