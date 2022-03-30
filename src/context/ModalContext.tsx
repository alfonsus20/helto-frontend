import React, { createContext, useContext, useState } from "react";
import Modal from "../components/Modal";

type ModalState = {
  isOpen: boolean;
  openModal: (dom: React.ReactNode) => void;
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

  const openModal = (dom: React.ReactNode) => {
    setDom(dom);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setDom(null);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, isOpen }}>
      <Modal dom={dom} isOpen={isOpen} onClose={closeModal} />
      {children}
    </ModalContext.Provider>
  );
};

export function useModalContext() {
  return useContext(ModalContext);
}
