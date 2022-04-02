import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import Loader from "../components/Loader";

type LoaderState = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

const defaultValue: LoaderState = {
  loading: false,
  setLoading: () => {},
};

const LoaderContext = createContext(defaultValue);

export const LoaderWrapper = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(defaultValue.loading);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {loading &&
        createPortal(
          <div className="h-screen w-screen flex items-center justify-center z-40 fixed bg-black bg-opacity-20  top-0 left-0 bottom-0 right-0">
            <Loader />
          </div>,
          document.body
        )}
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => {
  return useContext(LoaderContext);
};
