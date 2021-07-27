import React from "react";
import SimpleModal from "../../UI/modal";
import classes from "./ErrorModal.module.css";

const ErrorModal = (props) => {
  return (
    <SimpleModal open={props.currencyError || props.productsError}>
      <div className={classes.container}>
        {props.currencyError ? <h1>Currency api had a problem</h1> : null}

        {props.productsError ? <h1>Products api had a problem</h1> : null}
        <h1>please try again later</h1>
      </div>
    </SimpleModal>
  );
};

export default ErrorModal;
