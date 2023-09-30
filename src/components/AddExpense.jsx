import React, { useEffect, useState } from "react";
import Action from "./buttons/Action";
import { Link, useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { getData } from "../config/helper";

function Inputfield({
  type = "text",
  label,
  id,
  name,
  value,
  onChange,
  placeholder = "",
}) {
  return (
    <div className="mb-2">
      <label htmlFor={id}>{label}</label>
      <br />
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="bg-[#F5F5F5] mt-2 border outline-none focus:border-[#2D2727] focus:border-2 rounded-md w-3/4 px-2 py-1.5"
        placeholder={placeholder}
      />
    </div>
  );
}
export default function AddExpense() {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [fetchedCategory, setFetchedCategory] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData("category", user.uid);
        setFetchedCategory(data);
        if (data.length > 0) {
          setFormData({
            ...formData,
            category: data[0].category,
          });
        }
        console.log("Category Data", data);
      } catch (error) {
        console.log("Error in fetching", error);
      }
    };
    fetchData();
  }, [user.uid]);
  console.log("Fetched Data", fetchedCategory);
  const [formData, setFormData] = useState({
    expenseTitle: "",
    amount: "",
    category: fetchedCategory.length > 0 ? fetchedCategory[0].category : "",
    date: "",
  });
  const [isPending, setPending] = useState(false);
  const isAddButtonDisabled = !(
    formData.expenseTitle &&
    formData.amount &&
    formData.date
  );
  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  console.log(formData);
  async function handleAddExpense(e) {
    e.preventDefault();
    setPending(true);
    try {
      const expenseCollectionRef = collection(db, "expense");

      const newExpense = {
        ...formData,
        userId: user.uid,
        record: serverTimestamp(),
      };
      await addDoc(expenseCollectionRef, newExpense);
      console.log("Added Successfully");
      navigate("/home");
    } catch (error) {
      console.error("Error in adding expense", error);
    }
  }
  console.log(formData);
  return (
    <form action="" onSubmit={handleAddExpense}>
      <Inputfield
        label="Expense Title"
        id="expense-title"
        name="expenseTitle"
        value={formData.expenseTitle}
        onChange={handleInputChange}
        placeholder="Where did you spend your money"
      />
      <Inputfield
        label="Amount"
        id="amount"
        name="amount"
        value={formData.amount}
        onChange={handleInputChange}
        placeholder="How much did you spend"
      />
      <div className="mb-2">
        <label htmlFor="categories">Category</label>
        <br />
        <select
          name="category"
          id="categories"
          value={formData.category}
          onChange={handleInputChange}
          className="bg-[#F5F5F5] mt-2 border outline-none focus:border-[#2D2727] focus:border-2 rounded-md w-3/4 px-2 py-1.5 leading-10"
        >
          {/* <option value="food">Food</option>
          <option value="gadgets">Housing</option>
          <option value="clothes">Clothes</option>
          <option value="entertainment">Entertainment</option> */}
          {fetchedCategory.map((opt) => (
            <option key={opt.id} value={opt.category}>
              {opt.category}
            </option>
          ))}
        </select>
      </div>
      <Inputfield
        label="Choose Date"
        type="date"
        id="date"
        name="date"
        value={formData.date}
        onChange={handleInputChange}
      />
      <div className="mt-6 space-x-3">
        <Action
          disabled={isAddButtonDisabled || isPending}
          type="submit"
          color="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Add
        </Action>
        <Link to="/home">
          <Action color="bg-gray-100 hover:bg-gray-200 text-slate-500">
            Cancel
          </Action>
        </Link>
      </div>
    </form>
  );
}
