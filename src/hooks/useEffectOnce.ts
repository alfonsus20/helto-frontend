import { EffectCallback, useEffect } from "react";

const useEffectOnce = (func: EffectCallback) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(func, []);
};

export default useEffectOnce;
