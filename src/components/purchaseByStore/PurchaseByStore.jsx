import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import CustomTable from "../../UI/table";
import classes from "./PurchaseByStore.module.css";

const storeColumns = [
  { id: "storeName", label: "Store name", minWidth: 100 },
  {
    id: "quantity",
    label: "Quantity",
    minWidth: 170,
  },
  {
    id: "price",
    label: "Price",
    minWidth: 170,
    format: (value) => `$${value}`,
  },
];

const convertItemsToStoreData = (archivedItems, deliveryItems) => {
  const storeData = {};

  for (let item of archivedItems) {
    if (storeData[item.storeName]) {
      storeData[item.storeName].quantity++;
      console.log(item.price,'item.price')
      storeData[item.storeName].price += item.price;
    } else {
      storeData[item.storeName] = {
        quantity: 1,
        price: item.price,
      };
    }
  }

  for (let item of deliveryItems) {
    if (storeData[item.storeName]) {
      storeData[item.storeName].quantity++;
      console.log(item.price,'item.price')
      storeData[item.storeName].price += item.price;
    } else {
      storeData[item.storeName] = {
        quantity: 1,
        price: item.price,
      };
    }
  }

  return Object.keys(storeData).map((storeName) => {
    storeData[storeName].storeName = storeName;
    return storeData[storeName];
  });
};

const PurchaseByStore = (props) => {
  const [storeData, setStoreData] = useState([]);

  useEffect(() => {
    setStoreData(
      convertItemsToStoreData(props.archivedItems, props.deliveryItems)
    );
  }, [props.archivedItems, props.deliveryItems, props.currency]);

  return (
    <div className={classes.container}>
      <CustomTable columns={storeColumns} items={storeData} />
      <div className={classes.summery}>
        Total Price:
        {(storeData.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.price;
        }, 0) * (props.currency === '₪' ? props.ratioILS : 1)).toFixed(2)}
        {props.currency}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    archivedItems: state.productsReducer.archivedItems,
    deliveryItems: state.productsReducer.deliveryItems,
    currency: state.currencyReducer.currency,
    ratioILS: state.currencyReducer.ratioILS,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reactiveItem: (itemIndex) => dispatch(actions.reactiveItem(itemIndex)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseByStore);
