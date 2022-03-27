import { useEffect } from "react";

const useEffectOnce = (func: Function) => {
  return useEffect(() => {
    func();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useEffectOnce;
