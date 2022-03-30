import React, { ChangeEvent, useState } from "react";
import classNames from "classnames";
import { SelectItem } from "../../types/form";

type SelectProps = {
  onChange: (evt: ChangeEvent) => void;
  defaultText: string;
  items: SelectItem[];
  name: string;
  loading?: boolean;
  icon?: React.ReactNode;
  className?: string;
};

const Select = ({
  onChange,
  defaultText,
  items,
  name,
  loading,
  icon,
  className,
}: SelectProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<SelectItem | null>(null);

  const handleSelect = (item: SelectItem) => {
    setSelectedItem(item);
    setIsExpanded(false);
    const customEvent = {
      target: { name, value: item.value },
    } as ChangeEvent<HTMLSelectElement>;
    onChange(customEvent);
  };

  return (
    <div className={classNames("px-2 w-full", className)}>
      <div className="bg-pink-300 rounded-md border-2 border-white p-2 relative">
        {loading && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-white opacity-30 cursor-not-allowed"></div>
        )}
        <div className="text-white flex items-center gap-x-2">
          {icon && <div className="flex-shrink-0 pl-[2px]">{icon} </div>}
          <div className="flex-auto">
            <div
              className="cursor-pointer"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {loading
                ? "Loading..."
                : selectedItem
                ? selectedItem.label
                : defaultText}
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
    </div>
  );
};

export default Select;
