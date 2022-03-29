import React from "react";
import classNames from "classnames";
import type { CommonInputProps } from "../../theme";

import "./style.scss";

const Input = ({
  appearance = "primary",
  className,
  icon,
  fontSize = "md",
  ...rest
}: CommonInputProps & React.InputHTMLAttributes<HTMLElement>) => {
  return (
    <div className={classNames("relative w-full", className)}>
      {icon && (
        <span className="flex-shrink-0 absolute transform -translate-y-1/2 top-1/2 left-3">
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
        })}
        {...rest}
      />
    </div>
  );
};

export default Input;
