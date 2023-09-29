import React, { useEffect, useState } from "react";
import { filterCategory as getAmountInOneWeek } from "../config/filterCategory";
import { SiHappycow } from "react-icons/si";
import { GiClothes } from "react-icons/gi";
import { MdFastfood } from "react-icons/md";
import {GiPayMoney} from 'react-icons/gi'
const categeoryIcons = {
  entertainment: <SiHappycow />,
  clothing: <GiClothes />,
  food: <MdFastfood />,
};

export default function OverviewCard({ title }) {
  const [totalAmount, setTotalAmount] = useState(null);
  useEffect(() => {
    const fetchTotalAmount = async () => {
      try {
        const data = await getAmountInOneWeek(title, true);
        setTotalAmount(data);
      } catch (error) {
        console.error("Cannot fetch total amount", error);
      }
    };

    fetchTotalAmount();
  }, []);
  return (
    <div className="w-full flex justify-between items-center shadow-md shadow-[#445069] bg-[#546381] rounded-md px-4 py-6">
      <div className="flex items-center gap-4">
        {categeoryIcons[title.toLowerCase()] ? (
          <i className="text-[#c4deff] text-3xl">
            {categeoryIcons[title.toLowerCase()]}
          </i>
        ) : (
          <i className="text-[#c4deff] text-3xl"><GiPayMoney/></i>
        )}
        <p className="text-white text-lg font-semibold">{title}</p>
      </div>
      {totalAmount !== null && <p className="text-[#F0F0F0]">{totalAmount}</p>}
    </div>
  );
}
