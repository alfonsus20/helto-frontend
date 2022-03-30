import React from "react";

export type CommonSize = "sm" | "md" | "lg" | "xl" | "2xl";

export type CommonShape = "box" | "pill" | "rounded";

export type CommonFontSize = "xs" | "sm" | "md" | "lg";

export type CommonInputProps = {
  appearance?: "primary" | "secondary" | "tertiary";
  icon?: React.ReactNode;
  fontSize?: CommonFontSize;
};
