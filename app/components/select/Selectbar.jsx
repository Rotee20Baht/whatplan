'use client';

import Button from "../Button";
import SelectItem from "./SelectItem";

export default function Selectbar({ title1, title2, title3 }) {
  return (
    <div className="w-full border shadow-sm rounded-xl p-4">
      <div className="w-full flex flex-col lg:flex-row gap-4">
        <div className="w-full flex flex-col flex-1">
          <h1 className="font-semibold">{title1}</h1>
          <SelectItem label={title1} />
        </div>
        <div className="w-full flex flex-col flex-1">
          <h1 className="font-semibold">{title2}</h1>
          <SelectItem label={title2} />
        </div>
        <div className="w-full flex flex-col flex-1">
          <h1 className="font-semibold">{title3}</h1>
          <SelectItem label={title3} />
        </div>
        <div className="w-full flex flex-col flex-1">
          <Button label="ค้นหา" />
        </div>
      </div>
    </div>
  )
}
