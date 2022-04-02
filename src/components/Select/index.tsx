import React, { ChangeEvent, useState } from "react";
import classNames from "classnames";

import { SelectItem } from "../../types/form";

type SelectProps = {
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  defaultText: string;
  items: SelectItem[];
  name: string;
  loading?: boolean;
  icon?: React.ReactNode;
  className?: string;
  isError?: boolean;
  helperText?: string;
  value?: string;
};

const Select = ({
  onChange,
  defaultText,
  items,
  name,
  loading,
  icon,
  className,
  isError,
  helperText,
  value,
}: SelectProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleSelect = (item: SelectItem) => {
    setIsExpanded(false);
    const customEvent = {
      target: { name, value: item.value },
    } as ChangeEvent<HTMLInputElement>;
    onChange(customEvent);
  };

  return (
    <div className={classNames("w-full", className)}>
      <div
        className={classNames("bg-pink-300 rounded-md border-2 p-2 relative", {
          "border-white": !isError,
          "border-red-600": isError,
        })}
      >
        {loading && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-white opacity-30 cursor-not-allowed"></div>
        )}
        <div
          className={classNames(" flex items-center gap-x-2", {
            "text-white": !isError,
            "text-red-600": isError,
          })}
        >
          {icon && <div className="flex-shrink-0 pl-[2px]">{icon} </div>}
          <div className="flex-auto">
            <div
              className="cursor-pointer"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {loading ? "Loading..." : value ? value : defaultText}
            </div>
          </div>
        </div>
        <div
          className={classNames(
            "absolute left-0 right-0 text-sm top-[112%] bg-white max-h-[100px] overflow-y-auto z-20",
            {
              visible: isExpanded,
              invisible: !isExpanded,
            }
          )}
        >
          {items.map((item, idx) => (
            <div
              className="cursor-pointer px-4 py-2 hover:bg-slate-200"
              key={idx}
              onClick={() => handleSelect(item)}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
      {helperText && (
        <span
          className={classNames("text-xs", {
            "text-red-600": isError,
            "text-white": !isError,
          })}
        >
          {helperText}
        </span>
      )}
    </div>
  );
};

export default Select;
