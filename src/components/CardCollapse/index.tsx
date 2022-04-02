import { useState } from "react";
import classNames from "classnames";

import RadioButton from "../RadioButton";
import { ChevronDownIcon } from "@heroicons/react/outline";

import "./style.scss";

const CardCollapse = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>("");

  return (
    <div className="card-collapse">
      <div
        className="card-collapse__title"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div>Informasi Wilayah</div>
        <ChevronDownIcon className="w-5 h-5" />
      </div>
      <div
        className={classNames("card-collapse__body", {
          "is-collapsed": isCollapsed,
        })}
      >
        <div className="py-2 text-sm">
          <RadioButton
            label="Surabaya"
            name="wilayah"
            value="surabaya"
            id="surabaya"
            onChange={(e) => setSelectedId(e.target.value)}
          />
        </div>
        <div className="py-2 text-sm">
          <RadioButton
            label="Jombang"
            name="wilayah"
            value="Jombang"
            id="jombang"
            onChange={(e) => setSelectedId(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default CardCollapse;
