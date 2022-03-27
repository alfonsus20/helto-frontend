import React from "react";
import classNames from "classnames";
import type { CommonSize } from "../../theme";
import "./style.scss";

type ButtonAppearance = "primary" | "secondary" | "tertiary";
type ButtonShape = "box" | "pill";

type ButtonProps = {
  children: React.ReactNode;
  appearance?: ButtonAppearance;
  onClick?: (event: React.MouseEvent) => void;
  shape?: ButtonShape;
  size?: CommonSize;
  type?: "submit" | "button";
  width?: "auto" | "full";
};

const Button = ({
  children,
  appearance = "primary",
  size = "md",
  shape = "box",
  width = "auto",
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={classNames("btn", {
        "btn-primary": appearance === "primary",
        "btn-secondary": appearance === "secondary",
        "btn-tertiary": appearance === "tertiary",
        "is-box": shape === "box",
        "is-pill": shape === "pill",
        "w-auto": width === "auto",
        "w-full": width === "full",
      })}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
