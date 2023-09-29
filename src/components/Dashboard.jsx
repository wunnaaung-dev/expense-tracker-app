import React, { Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { getData } from "../config/helper";
import { formatDate } from "../helpers/date";
export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", id: "", expenseData: [] });
  const [loading, setLoading] = useState(true);
  const handleLogout = () => {
    signOut(auth)
      .then(() => navigate("/"))
      .catch((error) => {
        console.log(error);
      });
  };

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // You can also use 'auto' for an instant scroll
    });
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({ name: user.displayName, id: user.uid });
      } else {
        setUser({ name: "", id: "" });
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      if (user.id) {
        try {
          const data = await getData("expense", user.id);
          setUser((prevUser) => ({ ...prevUser, expenseData: data }));
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [user.id, navigate]);

  {
    loading && <h1>Loading...</h1>;
  }

  const expenseDataToRender = user.expenseData
    ? user.expenseData.slice(0, 5)
    : [];
  const totalAmount = expenseDataToRender?.reduce(
    (total, data) => total + parseInt(data.amount),
    0
  );
  return (
    <div className="bg-[#14182f] lg:w-72 lg:h-screen text-sm text-white py-5 px-2">
      <div className="flex justify-between mt-3">
        <p className="font-thin font-poppin  text-zinc-400">Recent Expenses</p>
        <Link to="#" className=" text-blue-500 underline">
          See all
        </Link>
      </div>
      {user.expenseData?.length === 0 ? (
        <p>Your list is empty</p>
      ) : (
        <ul className="mt-4 font-poppin space-y-2">
          {expenseDataToRender.map((data) => (
            <Suspense fallback={<p>Loading</p>}>
              <li
                key={data.id}
                className="flex flex-wrap justify-between border border-gray-500 rounded-md px-2 py-3 text-gray-300"
              >
                <div>
                  <p>{data.expenseTitle}</p>
                  <p className="text-xs text-slate-600">
                    {formatDate(data.date)}
                  </p>
                </div>
                <span>{data.amount}</span>
              </li>
            </Suspense>
          ))}
        </ul>
      )}
      <hr className="my-3 border border-slate-600" />
      <section className="flex font-poppin justify-between px-3 text-base font-semibold">
        {expenseDataToRender ? <p>Total</p> : " "}
        <p>{expenseDataToRender ? totalAmount : " "}</p>
      </section>
      <Link to="/home/expense">
        <button onClick={scrollToTop} className="mt-9 bg-blue-700 hover:bg-blue-600 w-full rounded-lg py-3">
          + Add New Expense
        </button>
      </Link>
      <button
        onClick={handleLogout}
        className="mt-3 bg-red-800 hover:bg-red-700 w-full rounded-lg py-3"
      >
        Log Out
      </button>
    </div>
  );
}
