import React, { useState } from "react";
import Action from "./buttons/Action";
import { Link, useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../config/firebase";

export default function CreateNewExpense() {
  const [newExpenseCategory, setNewExpenseCategory] = useState({
    category: "",
    limit: ""
  })
  const navigate = useNavigate()
  const user = auth.currentUser
  async function handleAddExpense(e) {
    e.preventDefault()
    try {
      const categoryCollectionRef = collection(db, "category");
      const newCategory = {
        ...newExpenseCategory,
        userId: user.uid,
        record: serverTimestamp()
      }
      await addDoc(categoryCollectionRef, newCategory)
      console.log("New Category is added successfully")
      navigate("/home/expense")
    } catch (error) {
      console.log("Error adding in Category", error)
    }
  }

  function handleOnChange(e) {
    const {name, value} = e.target;
    setNewExpenseCategory({
      ...newExpenseCategory,
      [name]: value,
    })
  }
  return (
    <form action="" onSubmit={handleAddExpense}>
      <div className="mb-2">
        <label htmlFor="category">Expense Category</label>
        <br />
        <input
          type="text"
          id="category"
          name="category"
          value={newExpenseCategory.category}
          onChange={handleOnChange}
          className="bg-[#F5F5F5] mt-2 border outline-none focus:border-[#2D2727] focus:border-2 rounded-md w-3/4 px-2 py-1.5"
          placeholder="Enter new expense category"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="limit">Limit</label>
        <br />
        <input
          type="text"
          id="limit"
          name="limit"
          value={newExpenseCategory.limit}
          onChange={handleOnChange}
          className="bg-[#F5F5F5] mt-2 border outline-none focus:border-[#2D2727] focus:border-2 rounded-md w-3/4 px-2 py-1.5"
          placeholder="Set maximum amount"
        />
      </div>
      <div className="mt-6 space-x-3">
        <Action color="bg-blue-600 hover:bg-blue-700 text-white">Create</Action>
        <Link to="/home">
          <Action color="bg-gray-100 hover:bg-gray-200 text-slate-500">
            Cancel
          </Action>
        </Link>
      </div>
    </form>
  );
}
