import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

// import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

// THE REDUCERS
import { productListReducer, productDetailsReducer } from "./reducers/productReducers";
import { userLoginReducer, userRegisterReducer, userUpdateProfile } from "./reducers/userReducer";
import { orderListMyReducer, orderCreateReducer, orderDetailReducers, orderPayReducer } from "./reducers/orderReducers";
import { userDetailsReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducers";

const cartItemsFromStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];

const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

const shippingAddressFromStoreage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const paymentMethodFromLocalStoreage = localStorage.getItem("paymentMethod")
  ? localStorage.getItem("paymentMethod")
  : "";

// const initialState = {
//   cart: {
//     cartItems: cartItemsFromStorage,
//     shippingAddress: shippingAddressFromStoreage,
//     paymentMethod: paymentMethodFromLocalStoreage,
//   },
//   userLogin: { userInfo: userInfoFromStorage },
// };
// const reducer = {
//   cart: cartReducer,
//   orderCreate: orderCreateReducer,
//   orderDetails: orderDetailReducers,
//   orderListMy: orderListMyReducer,
//   productList: productListReducer,
//   productDetails: productDetailsReducer,
//   userLogin: userLoginReducer,
//   userRegister: userRegisterReducer,
//   userDetails: userDetailsReducer,
//   userUpdateProfile: userUpdateProfile,
//   orderPay: orderPayReducer,
// };
// const middleware = [thunk];

// const store = configureStore({
//   reducer,
//   middleware,
//   devTools: process.env.NODE_ENV === "development",
//   preloadedState: initialState,
// });

// export default store;

/**************** alternative way: DONE IN THE COURSE *****************/

const reducer = combineReducers({
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailReducers,
  orderListMy: orderListMyReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfile,
  orderPay: orderPayReducer,
});
const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStoreage,
    paymentMethod: paymentMethodFromLocalStoreage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middlewares = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;
