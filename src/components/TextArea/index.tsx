import React from "react";
import classNames from "classnames";

import { CommonInputProps } from "../../theme";

const TextArea = ({
  appearance,
  className,
  rows = 3,
  isError,
  helperText,
  ...rest
}: CommonInputProps & React.TextareaHTMLAttributes<HTMLElement>) => {
  return (
    <div className={className}>
      <textarea
        className={classNames(
          "px-4 py-2 w-full outline-none border-2 focus:border-gray-400 rounded-lg resize-none",
          { "border-red-600 focus:border-red-600 placeholder:text-red-600 text-500": isError }
        )}
        rows={rows}
        {...rest}
      />
      {helperText && (
        <span className={classNames("text-xs", { "text-red-600": isError })}>
          {helperText}
        </span>
      )}
    </div>
  );
};

export default TextArea;
