import React from "react";
import classNames from "classnames";
import type { InputProps } from "../../theme";

const Input = ({
  appearance,
  className,
  ...rest
}: InputProps & React.InputHTMLAttributes<HTMLElement>) => {
  return (
    <input
      className={classNames(
        "px-4 py-2 w-full outline-0 focus:outline-1 outline-gray-400 rounded-lg",
        className
      )}
      {...rest}
    />
  );
};

export default Input;
