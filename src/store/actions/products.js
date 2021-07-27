import axios from "axios";

import * as actionTypes from "./actionTypes";

export const fetchProductsSuccess = (products) => {
  return {
    type: actionTypes.FETCH_PRODUCTS_SUCCESS,
    products: products,
  };
};

export const fetchProductsError = () => {
  return {
    type: actionTypes.FETCH_PRODUCT_ERROR,
  };
};

export const purchaseItem = (item) => {
  return {
    type: actionTypes.PURCHASE_ITEM,
    item: item,
  };
};

export const archiveItem = (itemIndex) => {
  return {
    type: actionTypes.ARCHIVE_ITEM,
    itemIndex: itemIndex,
  };
};

export const reactiveItem = (itemIndex) => {
  return {
    type: actionTypes.REACTIVE_ITEM,
    itemIndex: itemIndex,
  };
};

export const fetchProducts = () => {
  return (dispatch) => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        dispatch(fetchProductsSuccess(res));
      })
      .catch(() => {
        dispatch(fetchProductsError());
      });
  };
};
