import { useState } from "react";
import classNames from "classnames";

import RadioButton from "../RadioButton";
import { ChevronDownIcon } from "@heroicons/react/outline";

import "./style.scss";
import { SelectItem } from "../../types/form";

type CardCollapseProps = {
  title: string;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  choices: SelectItem[];
  value: string;
};

const CardCollapse = ({
  title,
  choices,
  name,
  onChange,
  value,
}: CardCollapseProps) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  return (
    <div className="card-collapse">
      <div
        className="card-collapse__title"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div>{title}</div>
        <ChevronDownIcon
          className={classNames("w-5 h-5 transition-all transform", { "rotate-0": isCollapsed , "rotate-180": !isCollapsed})}
        />
      </div>
      <div
        className={classNames("card-collapse__body", {
          "is-collapsed": isCollapsed,
        })}
      >
        {choices.map((choice, idx) => (
          <div className="py-2 text-sm" key={idx}>
            <RadioButton
              label={choice.label}
              name={name}
              value={choice.value}
              id={choice.label}
              onChange={onChange}
              checked={value === choice.value}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardCollapse;
