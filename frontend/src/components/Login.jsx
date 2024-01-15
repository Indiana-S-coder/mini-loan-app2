import React, { useContext, useState } from "react";
import { AuthContext } from "../App";
import { Link ,useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setToken, setLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      if (!email || !password) throw "Please fill all fields!";
      const user = await axios.post(
        "https://mini-loan-app2.vercel.app/api/v1/auth/login",
        { email, password }
      );
      setUser(user.data.user);
      setToken(user.data.token);
      setLoggedIn(true);
      localStorage.setItem("token", user.data.token);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(`Can't login!\nError: ${error}`);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="border-t-red-500 border-t-8 bg-slate-50 p-8 rounded-lg shadow-md w-full md:w-96">
        <h2 className="text-2xl font-bold mb-4 text-slate-600">Login</h2>
        <form className="space-y-4">
          <div className="flex flex-col items-start">
            <label className="block text-sm font-medium text-gray-600">
              Email:
            </label>
            <input
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:border-red-500"
            />
          </div>
          <div className="flex flex-col items-start">
            <label className="block text-sm font-medium text-gray-600">
              Password:
            </label>
            <input
            placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:border-red-500"
            />
          </div>
          <button
            type="button"
            onClick={handleLogin}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200"
          >
            Login
          </button>
        </form>
        <div className="mt-4">
          <span> Create new account? <Link
            to="/signup"
            className="text-red-500 hover:text-red-700 focus:outline-none focus:underline">
            Signup
          </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;