import { useRef } from "react";

function usePrevious(value: any) {
  const currRef = useRef(value);
  const prevRef = useRef();

  if (currRef.current !== value) {
    prevRef.current = currRef.current;
    currRef.current = value;
  }

  return prevRef.current;
}

export default usePrevious;
