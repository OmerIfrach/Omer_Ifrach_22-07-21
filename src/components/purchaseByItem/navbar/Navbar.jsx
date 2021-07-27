import React from "react";
import classes from "./Navbar.module.css";
import { AppBar, Toolbar, Button } from "@material-ui/core";

const ButtonAppBar = (props) => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button
            className={
              props.currentTab === "delivery" ? classes.activeTab : null
            }
            color="inherit"
            onClick={() => {
              props.changeCurrentTab("delivery");
            }}
          >
            Delivery
          </Button>
          <Button
            className={
              props.currentTab === "archiveItems" ? classes.activeTab : null
            }
            color="inherit"
            onClick={() => {
              props.changeCurrentTab("archiveItems");
            }}
          >
            Archive items
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default ButtonAppBar;
