import { XIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import React from "react";

import "./style.scss";

type ModalProps = {
  isOpen: boolean;
  dom: React.ReactNode;
  maxW?: "sm" | "md" | "lg";
  onClose?: () => void;
};

const Modal = ({ isOpen, dom, maxW = "md", onClose }: ModalProps) => {
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
          "w-full min-h-[16rem] bg-white rounded-md max-h-[80%] overflow-y-auto p-4 relative transition-all ease-out transform duration-500 mx-8 modal",
          {
            "max-w-sm": maxW === "sm",
            "max-w-md": maxW === "md",
            "max-w-lg": maxW === "lg",
            "opacity-0 translate-y-8": !isOpen,
            "opacity-1 translate-y-0": isOpen,
          }
        )}
      >
        <XIcon
          className="w-5 h-5 absolute right-4 top-4 cursor-pointer"
          onClick={onClose}
        />
        {dom}
      </div>
    </div>
  );
};

export default Modal;
