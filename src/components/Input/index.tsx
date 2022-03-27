import React from "react";
import classNames from "classnames";
import type { InputProps } from "../../theme";

import "./style.scss";

const Input = ({
  appearance = "primary",
  className,
  icon,
  ...rest
}: InputProps & React.InputHTMLAttributes<HTMLElement>) => {
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
        })}
        {...rest}
      />
    </div>
  );
};

export default Input;
