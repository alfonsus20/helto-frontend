import { XIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import React from "react";
import { CommonSize } from "../../theme";

import "./style.scss";

type ModalProps = {
  isOpen: boolean;
  maxW?: CommonSize;
  onClose?: () => void;
  children: React.ReactNode;
};

const Modal = ({ isOpen, children, maxW = "md", onClose }: ModalProps) => {
  return (
    <div
      className={classNames(
        "z-30 bg-black bg-opacity-50 w-full h-full flex items-center justify-center fixed top-0 bottom-0 left-0 right-0",
        {
          invisible: !isOpen,
          visible: isOpen,
        }
      )}
    >
      <div
        className={classNames(
          "w-full min-h-[12rem] bg-white rounded-md max-h-[80%] overflow-y-auto p-6 relative transition-modal ease-out transform duration-500 mx-8 modal",
          {
            "max-w-sm": maxW === "sm",
            "max-w-md": maxW === "md",
            "max-w-lg": maxW === "lg",
            "max-w-xl": maxW === "xl",
            "max-w-2xl": maxW === "2xl",
            "opacity-0 translate-y-8": !isOpen,
            "opacity-1 translate-y-0": isOpen,
          }
        )}
      >
        <XIcon
          className="w-5 h-5 absolute right-4 top-4 cursor-pointer"
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  );
};

export default Modal;
