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
};

const Button = ({
  children,
  appearance = "primary",
  size = "md",
  shape = "box",
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={classNames("btn", {
        "btn-primary": appearance === "primary",
        "btn-secondary": appearance === "secondary",
        "is-box": shape === "box",
        "is-pill": shape === "pill",
      })}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
