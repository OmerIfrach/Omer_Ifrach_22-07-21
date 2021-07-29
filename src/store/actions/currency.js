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
        "https://free.currconv.com/api/v7/convert?q=USD_ILS&compact=ultra&apiKey=ec40cdf7e1e406ce7592"
      )
      .then((res) => {
        dispatch(fetchCurrencySuccess(res.data.USD_ILS));
      })
      .catch(() => {
        dispatch(fetchCurrencyError());
      });
  };
};
