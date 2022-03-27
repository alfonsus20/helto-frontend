import React from "react";
import classNames from "classnames";
import type { InputProps } from "../../theme";

const TextArea = ({
  appearance,
  className,
  rows = 3,
  ...rest
}: InputProps & React.TextareaHTMLAttributes<HTMLElement>) => {
  return (
    <textarea
      className={classNames(
        "px-4 py-2 w-full outline-0 focus:outline-1 outline-gray-400 rounded-lg resize-none",
        className
      )}
      rows={rows}
      {...rest}
    />
  );
};

export default TextArea;
