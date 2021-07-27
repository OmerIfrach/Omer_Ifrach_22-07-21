import React, { useState } from "react";
import classes from "./AddItem.module.css";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions/index";
import {
  validateName,
  validatePositiveNumber,
  validateDate,
} from "../../../../utils/utils";
import { TextField, Button, Select, MenuItem } from "@material-ui/core";

const AddItem = (props) => {
  const [formData, setFormData] = useState({
    itemName: "",
    storeName: "",
    price: "",
    receiveDateEstimation: "",
  });

  const [formError, setFormError] = useState([]);

  const updateForm = (updateData) => {
    setFormData({
      ...formData,
      ...updateData,
    });
  };

  const validateForm = () => {
    let error = [];
    if (!validateName(formData.itemName) || formData.itemName.length === 0) {
      error.push("Item name is not valid");
    }
    if (!validateName(formData.storeName) || formData.storeName.length === 0) {
      error.push("Store name is not valid");
    }
    if (!validatePositiveNumber(formData.price)) {
      error.push("Price is invalid");
    }
    if (
      !validateDate(formData.receiveDateEstimation) ||
      formData.receiveDateEstimation.length === 0
    ) {
      error.push("Date is invalid");
    }

    setFormError(error);

    return error.length === 0;
  };

  return (
    <div className={classes.container}>
      <h3>Add Item</h3>

      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        className={classes.dropdown}
        onChange={(e) => {
          const selectedProduct = props.products[e.target.value];

          const updatedData = {
            itemName: selectedProduct.title,
            price: (selectedProduct.price * props.ratioILS).toFixed(2),
          };

          updateForm(updatedData);
        }}
      >
        {props.products.map((product, index) => {
          return (
            <MenuItem value={index} key={index}>
              <div className={classes.dropdownOption}>
                <span className={classes.dropdownOptionLeft}>
                  {product.title}
                </span>
                <span className={classes.dropdownOptionRight}>
                  {(product.price * props.ratioILS).toFixed(2)}
                  {props.currency}
                </span>
              </div>
            </MenuItem>
          );
        })}
      </Select>
      <form className={classes.form} noValidate autoComplete="off">
        <span>
          <TextField
            value={formData.itemName}
            onChange={(e) => {
              updateForm({
                itemName: e.target.value,
              });
            }}
            label="Item name"
            variant="outlined"
            error={
              formData.itemName.length !== 0 && !validateName(formData.itemName)
            }
          />
          <TextField
            value={formData.storeName}
            onChange={(e) => {
              updateForm({
                storeName: e.target.value,
              });
            }}
            label="Store"
            variant="outlined"
            error={
              formData.storeName.length !== 0 &&
              !validateName(formData.storeName)
            }
          />
        </span>
        <span>
          <TextField
            value={formData.price}
            onChange={(e) => {
              if (
                e.target.value.length !== 0 &&
                !validatePositiveNumber(+e.target.value)
              )
                return;

              updateForm({
                price: +e.target.value,
              });
            }}
            label={"Price in " + props.currency}
            variant="outlined"
            error={
              formData.price.length !== 0 &&
              !validatePositiveNumber(+formData.price)
            }
          />
          <TextField
            id="date"
            label="Receive date estimation"
            type="date"
            variant="outlined"
            value={formData.receiveDateEstimation}
            onChange={(e) => {
              updateForm({
                receiveDateEstimation: e.target.value,
              });
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </span>
      </form>
      <div>
        {formError.map((error, index) => {
          return (
            <div key={index} className={classes.error}>
              {error}
            </div>
          );
        })}
      </div>
      <span className={classes.buttonsContainer}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            if (validateForm()) {
              let price = +formData.price;
              if (props.currency === "₪") price = price / props.ratioILS;
              props.purchaseItem({
                ...formData,
                price,
              });
            }
          }}
        >
          Add
        </Button>
        <Button variant="contained" color="secondary" onClick={props.close}>
          Cancel
        </Button>
      </span>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.productsReducer.products,
    currency: state.currencyReducer.currency,
    ratioILS: state.currencyReducer.ratioILS,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    purchaseItem: (item) => dispatch(actions.purchaseItem(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddItem);
