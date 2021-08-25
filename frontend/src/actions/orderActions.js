import axios from "axios";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
} from "../constants/orderConstants";

export const createOrder = (order) => async (disptach, getState) => {
  try {
    disptach({ type: ORDER_CREATE_REQUEST });

    const { userInfo } = getState().userLogin;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/orders`, order, config);

    disptach({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    disptach({
      type: ORDER_CREATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getOrderDetails = (id) => async (disptach, getState) => {
  try {
    disptach({ type: ORDER_DETAILS_REQUEST });

    const { userInfo } = getState().userLogin;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);

    disptach({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    disptach({
      type: ORDER_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const payOrder = (orderId, paymentResult) => async (disptach, getState) => {
  try {
    disptach({ type: ORDER_PAY_REQUEST });

    const { userInfo } = getState().userLogin;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config);

    disptach({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    disptach({
      type: ORDER_PAY_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const deliverOrder = (order) => async (disptach, getState) => {
  try {
    disptach({ type: ORDER_DELIVER_REQUEST });

    const { userInfo } = getState().userLogin;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/orders/${order._id}/deliver`, {}, config);

    disptach({
      type: ORDER_DELIVER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    disptach({
      type: ORDER_DELIVER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const listMyOrders = () => async (disptach, getState) => {
  try {
    disptach({ type: ORDER_LIST_MY_REQUEST });

    const { userInfo } = getState().userLogin;

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/myorders`, config);

    disptach({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    disptach({
      type: ORDER_LIST_MY_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const listAllOrders = () => async (disptach, getState) => {
  try {
    disptach({ type: ORDER_LIST_REQUEST });

    const { userInfo } = getState().userLogin;

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders`, config);

    disptach({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    disptach({
      type: ORDER_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
