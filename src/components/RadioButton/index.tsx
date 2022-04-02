import React from "react";
import classNames from "classnames";

type RadioButtonProps = {
  label: string;
};

const RadioButton = ({
  className,
  label,
  id,
  ...rest
}: RadioButtonProps & React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <label
      htmlFor={`radio-item-${id}`}
      className="flex items-center gap-x-2 cursor-pointer"
    >
      <input
        id={`radio-item-${id}`}
        type="radio"
        hidden
        className={classNames("peer", className)}
        {...rest}
      />
      <span
        className="w-5 h-5 bg-white border-2 border-brown-500 relative rounded-full
    after:content-[''] after:absolute peer-checked:after:bg-brown-500 after:w-3 after:h-3 
    after:right-0 after:left-0 after:top-0 after:bottom-0
    after:m-auto after:rounded-full"
      ></span>
      {label}
    </label>
  );
};

export default RadioButton;
