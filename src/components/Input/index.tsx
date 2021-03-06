import React from "react";
import classNames from "classnames";

import { CommonInputProps } from "../../theme";

import "./style.scss";

const Input = ({
  appearance = "primary",
  className,
  icon,
  fontSize = "md",
  isError,
  helperText,
  ...rest
}: CommonInputProps & React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className={classNames("w-full input-wrapper", className)}>
      <div className="relative">
        {icon && (
          <span
            className={classNames(
              "flex-shrink-0 absolute transform -translate-y-1/2 top-1/2 left-3 icon-wrapper",
              { "is-error": isError }
            )}
          >
            {icon}
          </span>
        )}
        <input
          className={classNames("input", {
            "input-primary": appearance === "primary",
            "input-secondary": appearance === "secondary",
            "input-tertiary": appearance === "tertiary",
            "text-xs": fontSize === "xs",
            "text-sm": fontSize === "sm",
            "text-base": fontSize === "md",
            "text-lg": fontSize === "lg",
            "pl-4": !icon,
            "pl-9": !!icon,
            "is-error": isError,
          })}
          {...rest}
        />
      </div>
      {helperText && (
        <span className={classNames("text-xs", { "text-red-600": isError })}>
          {helperText}
        </span>
      )}
    </div>
  );
};

export default Input;
