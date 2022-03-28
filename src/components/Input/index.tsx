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
    <div
      className={classNames("flex w-full items-center", className, {
        "border-2 border-white": appearance === "secondary",
      })}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <input
        className={classNames("input", {
          "input-primary": appearance === "primary",
          "input-secondary": appearance === "secondary",
          "input-tertiary": appearance === "tertiary",
          "text-xs": fontSize === "xs",
          "text-sm": fontSize === "sm",
          "text-base": fontSize === "md",
          "text-lg": fontSize === "lg",
        })}
        {...rest}
      />
    </div>
  );
};

export default Input;
