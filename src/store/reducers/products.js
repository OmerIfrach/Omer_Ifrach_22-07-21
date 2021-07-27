import * as actionTypes from "../actions/actionTypes";

const initialState = {
    products: [],
    deliveryItems:[],
    archivedItems:[],
    error: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products:action.products.data
      }
    case actionTypes.FETCH_PRODUCT_ERROR:
      return {
        ...state,
        error: true
      }  
    case actionTypes.PURCHASE_ITEM:
      return {
        ...state,
        deliveryItems:[...state.deliveryItems, action.item]
      };  
    case actionTypes.ARCHIVE_ITEM:
        const itemToArchive = state.deliveryItems[action.itemIndex];

        return {
          ...state,
          deliveryItems:[
            ...state.deliveryItems.slice(0,action.itemIndex),
            ...state.deliveryItems.slice(action.itemIndex + 1)
          ],
          archivedItems : [...state.archivedItems, itemToArchive]
        };
    case actionTypes.REACTIVE_ITEM:
      const itemToReactive = state.archivedItems[action.itemIndex];

      return {
        ...state,
        archivedItems:[
          ...state.archivedItems.slice(0,action.itemIndex),
          ...state.archivedItems.slice(action.itemIndex + 1)
        ],
        deliveryItems : [...state.deliveryItems, itemToReactive]
      };
    default:
        return state;  

  }
};

export default reducer