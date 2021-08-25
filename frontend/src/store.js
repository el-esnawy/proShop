import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

// import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

// THE REDUCERS
import { cartReducer } from "./reducers/cartReducers";
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productCreateReviewReducer,
  productTopRatedReducers,
} from "./reducers/productReducers";
import { userLoginReducer, userRegisterReducer, userUpdateProfile, userDeleteReducer } from "./reducers/userReducer";
import { userDetailsReducer, userListReducer, userUpdateReducer } from "./reducers/userReducer";
import {
  orderListMyReducer,
  orderCreateReducer,
  orderDetailReducers,
  orderPayReducer,
  orderListReducer,
  orderDeliverReducer,
} from "./reducers/orderReducers";

const cartItemsFromStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];

const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

const shippingAddressFromStoreage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const paymentMethodFromLocalStoreage = localStorage.getItem("paymentMethod")
  ? localStorage.getItem("paymentMethod")
  : "";

const reducer = combineReducers({
  cart: cartReducer,
  productList: productListReducer,
  productDelete: productDeleteReducer,
  productDetails: productDetailsReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productCreateReviewReducer,
  productTopRated: productTopRatedReducers,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailReducers,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  orderDeliver: orderDeliverReducer,
  orderPay: orderPayReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdateProfile: userUpdateProfile,
  userUpdate: userUpdateReducer,
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

/**************** alternative way: DONE IN THE COURSE *****************/
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
//   orderPay: orderPayReducer,
//   productList: productListReducer,
//   productDetails: productDetailsReducer,
//   userLogin: userLoginReducer,
//   userRegister: userRegisterReducer,
//   userDetails: userDetailsReducer,
//   userList: userListReducer,
//   userUpdateProfile: userUpdateProfile,
// };
// const middleware = [thunk];

// const store = configureStore({
//   reducer,
//   middleware,
//   devTools: process.env.NODE_ENV === "development",
//   preloadedState: initialState,
// });

// export default store;
