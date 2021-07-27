import React, { useState } from "react";
import Navbar from "./navbar/Navbar";
import Delivery from "./delivery/Delivery";
import Archive from "./archive/Archive";
import classes from "./PurchaseByItem.module.css";

const PurchaseByItem = () => {
  const [currentTab, setCurrentTab] = useState("delivery");

  const changeCurrentTab = (newTab) => {
    setCurrentTab(newTab);
  };

  return (
    <div className={classes.container}>
      <Navbar changeCurrentTab={changeCurrentTab} currentTab={currentTab} />
      {currentTab === "delivery" && <Delivery />}
      {currentTab === "archiveItems" && <Archive />}
    </div>
  );
};

export default PurchaseByItem;
