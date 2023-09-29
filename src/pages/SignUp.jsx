import React, { useState } from "react";
import SignUpImg from "../assets/SignUpImg.jpg";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: username,
      });
      console.log(user)
      console.log("Successfully updated user profile");
      navigate("/")
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(errorMessage)
    }
  }

  return (
    <div className="flex h-screen bg-cyan-50">
      <div className="w-2/3 h-screen">
        <img className="h-full w-full" src={SignUpImg} alt="" />
      </div>
      <form
        className="w-1/2 h-screen flex flex-col justify-center items-center"
        action=""
      >
        <h1 className="font-semibold text-2xl">Manage your budget with us!</h1>
        {error && <p>{error}</p>}
        <div className="w-72 mt-3">
          <label htmlFor="username">Username</label>
          <br />
          <input
            required
            className="bg-gray-300 w-full shadow-sm rounded-md px-2 py-1"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Username"
          />
        </div>

        <div className="w-72 mt-3">
          <label htmlFor="email">Email</label>
          <br />
          <input
            required
            className="bg-gray-300 w-full shadow-sm rounded-md px-2 py-1"
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>

        <div className="w-72 mt-2">
          <label htmlFor="password">Password</label>

          <input
            className="bg-gray-300 w-full shadow-sm rounded-md px-2 py-1"
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-72 rounded-md mt-4 py-2 bg-blue-600 hover:bg-blue-700 text-white"
        >
          Register
        </button>
        <p className="mt-3">
          Already have an account?{" "}
          <Link to="/">
            <span className="text-blue-600">Sign In</span>
          </Link>
        </p>
      </form>
    </div>
  );
}
