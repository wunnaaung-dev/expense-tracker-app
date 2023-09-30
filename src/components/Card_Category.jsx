import React, { useEffect, useState } from "react";
import { filterCategory } from "../config/filterCategory";
import Card_Loading from "./Card_Loading";

export default function Card_Category({ title, limit }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch the data asynchronously
    const fetchData = async () => {
      try {
        const result = await filterCategory(title);
        setData(result);
      } catch (error) {
        // Handle any errors that may occur during data fetching
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, [title]); // Trigger the effect whenever the title prop changes

  if (data === null) {
    // Data is still loading, you can return a loading indicator or null
    return <Card_Loading />;
  }
  let bgColor = "h-2 rounded-full ";
  let percentage = (data / limit) * 100;
  console.log("Percentage is ", Math.round(percentage));
  let progressBar = `${Math.round(percentage)}%`;

  if (percentage < 50) {
    bgColor += "bg-green-500";
  } else {
    bgColor += "bg-red-500";
  }
  return (
    <div className="bg-slate-200 w-70 h-max rounded-md px-4 py-6 shadow-md">
      <div className="flex justify-between">
        <h1>{title}</h1>
        <div className="flex gap-1">
          <p className="font-medium text-slate-500">{data}</p>
          <p>/</p>
          <p className="font-semibold text-[#272829]">{limit}</p>
        </div>
      </div>
      <div className="w-full h-2 bg-slate-300 rounded-full mt-3">
        <div
          className={bgColor}
          style={{ width: percentage > 100 ? "100%" : progressBar }}
        ></div>
      </div>
    </div>
  );
}
