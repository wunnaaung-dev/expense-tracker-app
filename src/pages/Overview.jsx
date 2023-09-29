import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { getData } from "../config/helper";
import OverviewCard from "../components/OverviewCard";

export default function Overview() {
  const [isAuthenticated, setAuthenticated] = useState(false)
  const [category, setCategroy] = useState()
  const navigate = useNavigate()
  const user = auth?.currentUser
  const [currentUserName, setUserName] = useState("")
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user) {
        setAuthenticated(true)
        setUserName(user.displayName)
      } else {
        setAuthenticated(false)
        navigate("/")
      }
    })
    return () => unsubscribe()
  }, [navigate])

  useEffect(() => {
    const getCategory = async () => {
      try {
        const data = await getData("category", user.uid)
        setCategroy(data)
      } catch (error) {
        console.log("Error in overview page", error)
      }
    }
    getCategory()
  }, [])
  console.log("Category data in overview page", category)
  const currentHours = new Date().getHours();
  let greeting = "";
  if (currentHours >= 5 && currentHours < 12) {
    greeting = "Morning";
  } else if (currentHours > 12 && currentHours < 18) {
    greeting = "Afternoon";
  } else {
    greeting = "Evening";
  }
  const today = new Date();
  const formattedDate = today.toDateString();

  if(!isAuthenticated) {
    return null
  }
  return (
    <div className="w-3/4 px-6 bg-[#0e1020] h-screen text-white">
      <div className="flex justify-between w-full font-poppin mt-5">
        <h1 className="font-medium">Good {greeting}, {currentUserName}</h1>
        <p className='font-medium text-zinc-400'>{formattedDate}</p>
      </div>
      <div className="mt-5">
        <p className="font-bold text-xl">Expenses during this week</p>
        <div className="mt-5">
          <ul className='space-y-3'>
            {category?.map(ct => 
              <li key={ct.id}>
                <OverviewCard title={ct.category}/>
              </li>  
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
