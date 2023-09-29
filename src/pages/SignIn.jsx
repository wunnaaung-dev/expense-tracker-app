import React, { useState } from "react";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import CoverImg from "../assets/LoginFormImg.jpg";
export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null)
  const navigate = useNavigate();
  function handleLogin(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/home");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.errorCode;
        const errorMessage = error.message;
        setError(errorMessage)
      });
  }
  return (
    <div className="flex h-screen bg-cyan-50">
      <div className="w-2/3 h-screen">
        <img className="h-full w-full" src={CoverImg} alt="" />
      </div>
      <form
        className="w-1/2 h-screen flex flex-col justify-center items-center"
        action=""
      >
        <h1 className="font-semibold text-2xl">Welcome!</h1>
        {error && <p className="font-semilbold text-red-500">{error}</p>}
        <div className="w-72 mt-3">
          <label htmlFor="email">Email</label>
          <br />
          <input
            required
            className="bg-gray-300 w-full shadow-sm rounded-md px-2 py-1"
            type="text"
            id="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="w-72 mt-2">
          <label htmlFor="password">Password</label>

          <input
            className="bg-gray-300 w-full shadow-sm rounded-md px-2 py-1"
            type="password"
            id="password"
            value={password}
            required
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="w-72 rounded-md mt-4 py-2 bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleLogin}
        >
          Log in
        </button>
        <p className="mt-3">
          Don't have an account?{" "}
          <Link to="/sign-up">
            <span className="text-blue-600">Sign Up</span>
          </Link>
        </p>
      </form>
    </div>
  );
}
