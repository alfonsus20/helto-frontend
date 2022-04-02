import React from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

import  { CommonSize, CommonShape } from "../../theme";

import "./style.scss";

type ButtonAppearance =
  | "primary"
  | "secondary"
  | "tertiary"
  | "edit"
  | "delete"
  | "default";

type ButtonProps = {
  children: React.ReactNode;
  appearance?: ButtonAppearance;
  onClick?: (event: React.MouseEvent) => void;
  shape?: CommonShape;
  size?: CommonSize;
  type?: "submit" | "button";
  width?: "auto" | "full";
  pathname?: string;
  disabled?: boolean;
};

const Button = ({
  children,
  appearance = "primary",
  size = "md",
  shape = "box",
  width = "auto",
  pathname,
  disabled,
  onClick,
  ...rest
}: ButtonProps) => {
  const navigate = useNavigate();
  const navigateTo = () => navigate(`/${pathname}`);

  return (
    <button
      onClick={
        pathname
          ? (event) => {
              navigateTo();
              onClick && onClick(event);
            }
          : onClick
      }
      className={classNames("btn", {
        "btn-primary": appearance === "primary",
        "btn-secondary": appearance === "secondary",
        "btn-tertiary": appearance === "tertiary",
        "btn-edit": appearance === "edit",
        "btn-delete": appearance === "delete",
        "btn-default": appearance === "default",
        "is-box": shape === "box",
        "is-pill": shape === "pill",
        "is-rounded": shape === "rounded",
        "is-disabled": disabled,
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
