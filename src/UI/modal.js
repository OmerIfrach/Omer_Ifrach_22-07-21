import React from "react";
import Modal from "@material-ui/core/Modal";

const SimpleModal = (props) => {
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.close}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {props.children}
      </Modal>
    </div>
  );
};

export default SimpleModal;
