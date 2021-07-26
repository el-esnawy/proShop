import axios from "axios";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_SUCCESS,
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
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
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
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
