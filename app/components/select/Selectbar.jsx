'use client';

import Button from "../Button";
import SelectItem from "./SelectItem";
import { provinces } from "@/app/providers/SelectDataProvider";

export default function Selectbar({ title1, title2, title3, options1 = provinces, options2, options3 }) {
  return (
    <div className="w-full border shadow-sm rounded-xl p-4 bg-white">
      <div className="w-full flex flex-col lg:flex-row gap-4">
        <div className="w-full flex flex-col flex-1">
          <SelectItem label={title1} options={options1} />
        </div>
        <div className="w-full flex flex-col flex-1">
          <SelectItem label={title2} options={options2} />
        </div>
        <div className="w-full flex flex-col flex-1">
          <SelectItem label={title3} options={options3} />
        </div>
        <div className="w-full flex flex-col flex-1">
          <Button label="ค้นหา" />
        </div>
      </div>
    </div>
  )
}
