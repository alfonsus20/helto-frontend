import React from "react";
import classNames from "classnames";
import type { CommonSize } from "../../theme";
import { useNavigate } from "react-router-dom";

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
  pathname?: string;
};

const Button = ({
  children,
  appearance = "primary",
  size = "md",
  shape = "box",
  width = "auto",
  pathname,
  onClick,
  ...rest
}: ButtonProps) => {
  const navigate = useNavigate();
  const navigateTo = () => navigate(`/${pathname}`);

  return (
    <button
      onClick={pathname ? navigateTo : onClick}
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
