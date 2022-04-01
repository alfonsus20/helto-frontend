import React, { createContext, useContext, useState } from "react";
import Modal from "../components/Modal";
import { CommonSize } from "../theme";

type ModalState = {
  isOpen: boolean;
  openModal: (dom: React.ReactNode, size?: CommonSize) => void;
  closeModal: () => void;
};

const defaultValue: ModalState = {
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
};

const ModalContext = createContext(defaultValue);

export const ModalWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dom, setDom] = useState<React.ReactNode>();
  const [size, setSize] = useState<CommonSize | undefined>("md");

  const openModal = (dom: React.ReactNode, size: CommonSize = "md") => {
    setDom(dom);
    setIsOpen(true);
    setSize(size);
  };

  const closeModal = () => {
    setIsOpen(false);
    setDom(null);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, isOpen }}>
      <Modal isOpen={isOpen} onClose={closeModal} maxW={size}>
        {dom}
      </Modal>
      {children}
    </ModalContext.Provider>
  );
};

export function useModalContext() {
  return useContext(ModalContext);
}
