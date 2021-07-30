import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from "../constants/productConstats";
import axios from "axios";

// export const listProducts = () => async (dispatch) => {
//   try {
//     dispatch({ type: PRODUCT_LIST_REQUEST });
//     const { data } = await axios.get("/api/products");
//     dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({
//       type: PRODUCT_LIST_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

export const listProducts = (dispatch) => {
  const list = async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const { data } = await axios.get("/api/products");
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
    }
  };
  list(dispatch);
};

export const listProductDetails = (dispatch, id) => {
  const list = async (dispatch, id) => {
    try {
      dispatch({ type: PRODUCT_DETAILS_REQUEST });
      const { data } = await axios.get(`/api/products/${id}`);
      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
    }
  };

  list(dispatch, id);
};

// export function listProductDetails(dispatch) {
//   const list = async (dispatch, id) => {
//     try {
//       dispatch({ type: PRODUCT_DETAILS_REQUEST });
//       const { data } = await axios.get(`/api/products/${id}`);
//       dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
//     } catch (error) {
//       dispatch({
//         type: PRODUCT_DETAILS_FAIL,
//         payload:
//           error.response && error.response.data.message
//             ? error.response.data.message
//             : error.message,
//       });
//     }
//   };

//   list(dispatch, this.params.id);
// }
