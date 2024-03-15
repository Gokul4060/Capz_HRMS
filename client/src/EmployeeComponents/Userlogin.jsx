import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  }

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/login", credentials);
      // Assuming backend returns user data upon successful login
      const { email } = response.data.user;
      // Show success message using toast
      toast.success("Login successful!", { position: "top-right" });
      // Redirect to user page 
      navigate("/user", { state: { email } });
    } catch (error) {
      toast.error("Invalid email or password", { position: "top-right" });
    }
  }

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600">
        <div className="text-center">
          <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Login</h3>
          
        </div>
        <form className="mt-8 space-y-5" onSubmit={submitForm}>
          <div>
            <label htmlFor="email" className="font-medium">
              Email
            </label>
            <input
              type="email"
              required
              onChange={inputHandler}
              value={credentials.email}
              id="email"
              name="email"
              autoComplete='off'
              placeholder='Email'
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="password" className="font-medium">
              Password
            </label>
            <input
              type="password"
              required
              onChange={inputHandler}
              value={credentials.password}
              id="password"
              name="password"
              autoComplete='off'
              placeholder='password'
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
          >
            LOGIN
          </button>
        </form>
       
      </div>
    </main>
  );
}

export default Login;
