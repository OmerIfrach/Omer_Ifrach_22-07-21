import React, { useState } from "react";
import SimpleModal from "../../../UI/modal";
import Button from "@material-ui/core/Button";
import AddItem from "./addItem/AddItem";
import CustomTable from "../../../UI/table";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import classes from "./delivery.module.css";

const deliveryColumns = [
  { id: "itemName", label: "Item name", minWidth: 170 },
  { id: "storeName", label: "Store name", minWidth: 100 },
  {
    id: "price",
    label: "Price",
    minWidth: 170,
    format: (value) => value,
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

const Delivery = (props) => {
  const [openAddItemModal, setOpenAddItemModal] = useState(false);

  const toggleAddItemModal = () => {
    setOpenAddItemModal(!openAddItemModal);
  };

  return (
    <div className={classes.container}>
      <SimpleModal open={openAddItemModal}>
        <AddItem close={toggleAddItemModal} />
      </SimpleModal>
      <Button
        className={classes.addItem}
        variant="contained"
        color="primary"
        onClick={toggleAddItemModal}
      >
        + Add item
      </Button>
      <span className={classes.tableContainer}>
        <CustomTable
          columns={deliveryColumns}
          items={props.deliveryItems}
          actionLabel="Archive"
          actionFunc={(itemIndex) => {
            props.archiveItem(itemIndex);
          }}
          showPagination
        />
      </span>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    deliveryItems: state.productsReducer.deliveryItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    archiveItem: (itemIndex) => dispatch(actions.archiveItem(itemIndex)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Delivery);
