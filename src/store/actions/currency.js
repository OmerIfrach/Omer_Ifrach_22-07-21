import axios from "axios";

import * as actionTypes from "./actionTypes";

export const changeCurrency = (currencySign) => {
  return {
    type: actionTypes.CHANGE_CURRENCY,
    currency: currencySign,
  };
};

export const fetchCurrencySuccess = (ratio) => {
  return {
    type: actionTypes.FETCH_CURRENCY_SUCCESS,
    ratio: ratio,
  };
};

export const fetchCurrencyError = () => {
  return {
    type: actionTypes.FETCH_CURRENCY_ERROR,
  };
};

export const fetchCurrency = () => {
  return (dispatch) => {
    axios
      .get(
        "http://api.exchangeratesapi.io/v1/latest?access_key=a7fa6f92749688036f91e45c20e4bf94&symbols=USD,ILS"
      )
      .then((res) => {
        const ratio = res.data.rates.ILS / res.data.rates.USD;
        dispatch(fetchCurrencySuccess(ratio));
      })
      .catch(() => {
        dispatch(fetchCurrencyError());
      });
  };
};
