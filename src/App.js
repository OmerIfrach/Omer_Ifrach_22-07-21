import React, { useEffect } from "react";
import classes from "./App.module.css";
import {
  Switch,
  Route,
  BrowserRouter,
  withRouter,
  Redirect,
} from "react-router-dom";
import PurchaseByItem from "./components/purchaseByItem/PurchaseByItem";
import PurchaseByStore from "./components/purchaseByStore/PurchaseByStore";
import ErrorModal from "./components/error/ErrorModal";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import Navbar from "./components/navbar/Navbar";

const App = (props) => {
  useEffect(() => {
    props.fetchProducts();
    props.fetchCurrency();
  }, [props]);
  return (
    <div className={classes.App}>
      <BrowserRouter>
        <Navbar />
        <ErrorModal currencyError = {props.currencyError} productsError = {props.productsError}/>
        <Switch>
          <Route path="/purchaseByItem" exact component={PurchaseByItem} />
          <Route path="/purchaseByStore" component={PurchaseByStore} />
          <Redirect to="purchaseByItem" />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    productsError: state.productsReducer.error,
    currencyError: state.currencyReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => dispatch(actions.fetchProducts()),
    fetchCurrency: () => dispatch(actions.fetchCurrency()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
