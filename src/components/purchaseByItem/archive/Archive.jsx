import React from "react";
import CustomTable from "../../../UI/table";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import classes from "./Archive.module.css";

const deliveryColumns = [
  { id: "itemName", label: "Item name", minWidth: 170 },
  { id: "storeName", label: "Store name", minWidth: 100 },
  {
    id: "price",
    label: "Price",
    minWidth: 170,
    format: (value) => `$${value}`,
  },
  {
    id: "deliveryEstimation",
    label: "Delivery estimation",
    minWidth: 170,
  },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
    align: "right",
  },
];

const Archive = (props) => {
  return (
    <div className={classes.container}>
      <CustomTable
        columns={deliveryColumns}
        items={props.archivedItems}
        actionLabel="Reactive"
        actionFunc={(itemIndex) => {
          props.reactiveItem(itemIndex);
        }}
        showPagination
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    archivedItems: state.productsReducer.archivedItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reactiveItem: (itemIndex) => dispatch(actions.reactiveItem(itemIndex)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Archive);
