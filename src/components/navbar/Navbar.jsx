import React from "react";
import { NavLink } from "react-router-dom";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import { AppBar, Toolbar, Button, Select, MenuItem } from "@material-ui/core";
import classes from "./Navbar.module.css";

const Navbar = (props) => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button className={classes.navigationButton}>
            <NavLink to="/">Purchase by item</NavLink>
          </Button>
          <Button className={classes.navigationButton}>
            <NavLink exact to="/purchaseByStore">
              Purchase by stores
            </NavLink>
          </Button>
          <Select className={classes.dropdown}
            value={props.currency}
            onChange={(e) => {
              props.changeCurrency(e.target.value);
            }}
          >
            <MenuItem value={"$"}>$</MenuItem>
            <MenuItem value={"₪"}>₪</MenuItem>
          </Select>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currency: state.currencyReducer.currency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrency: (currencySign) =>
      dispatch(actions.changeCurrency(currencySign)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
