import React, { Suspense, useEffect, useState } from "react";
import { getData } from "../config/helper";
import { auth } from "../config/firebase";
// import Card_Category from "../components/Card_Category";
const Card_Category = React.lazy(() => import("../components/Card_Category"));

import Card_Loading from "../components/Card_Loading";

export default function Categories() {
  const [categories, setCategories] = useState(null);
  const user = auth.currentUser;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData("category", user?.uid);
        setCategories(data);
      } catch (error) {
        console.log("Error in categories", error);
      }
    };
    fetchData();
  }, [user]);
  console.log("Checking null data", categories)
  if(categories?.length === 0) {
    return(
      <div className="flex justify-center items-center bg-[#0e1020] h-screen w-full">
        <h1 className="font-bold text-white text-2xl">There is no category yet...</h1>
      </div>
    )
  }
  return (
    <div className="pt-4 px-5 bg-[#0e1020] h-screen w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {categories?.map((category) => (
          <Suspense fallback={<Card_Loading />} key={category.id}>
            <Card_Category title={category.category} limit={category.limit} />
          </Suspense>
        ))}
      </div>
    </div>
  );
}
