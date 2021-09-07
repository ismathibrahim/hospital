import React from "react";

import { ReactComponent as CloseIcon } from "../../assets/close-icon.svg";
import "./Modal.scss";

type ModalProps = {
  modalHidden: boolean;
  handleClose: () => void;
  handleOk: ([string]: any) => any;
  title: string;
  okText: string;
  cancelText?: string;
  children?: React.ReactNode;
};

const Modal = ({
  modalHidden,
  handleClose,
  handleOk,
  title,
  okText,
  children,
}: ModalProps) => {
  const hiddenStyle = modalHidden ? { display: "none" } : {};

  return (
    <div className="modal" style={hiddenStyle}>
      <div className="wrapper card">
        <div className="modal-header">
          <h3 className="title">{title}</h3>
          <div className="close-button" onClick={handleClose}>
            <CloseIcon />
          </div>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <button onClick={handleOk}>{okText}</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
