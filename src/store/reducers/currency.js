import * as actionTypes from "../actions/actionTypes";

const initialState = {
  currency: "$",
  ratioILS: null,
  error:false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CURRENCY_SUCCESS:
      return {
        ...state,
        ratioILS: action.ratio,
      };
      case actionTypes.FETCH_CURRENCY_ERROR:
        return {
          ...state,
          error: true
        }
    case actionTypes.CHANGE_CURRENCY:
      return {
        ...state,
        currency: action.currency,
      };
    default:
      return state;
  }
};

export default reducer;
