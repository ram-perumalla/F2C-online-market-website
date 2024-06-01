import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import AxiosAPI from "../AxiosAPI";
import { toast } from "react-toastify";
const Login = () => {
  const [selectLogin, setSelectLogin]=useState();
  const handleSelectChange=(e)=>setSelectLogin(e.target.value);
  const navigateTo=useNavigate()
  const loginFunction=async(e)=>{
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    if(selectLogin==="consumer"){
try {
 
  const res=await AxiosAPI.post(`customer/login`, formProps);
  const data ={ role:"user",user:res.data.User}
  // console.log(JSON.stringify(data));
  sessionStorage.setItem("login", JSON.stringify(data))
  toast.success(res.data.message);
navigateTo("/")
} catch (error) {
  toast.error(error.response?.data.message)
  console.log("consumer Login error", error);
}
    }else if (selectLogin==="farmer"){
try {
  const res=await AxiosAPI.post(`farmer/login`, formProps);
  console.log(res);
  toast.success(res.data.message);
  const data ={ role:"farmer",farmer:res.data.Farmer}
  console.log(JSON.stringify(data));
  sessionStorage.setItem("login", JSON.stringify(data))
  navigateTo("/");
} catch (error) {
  toast.error(error.response?.data.message)
  console.log("Farmer Login error", error);
  
}
    }else
    alert("please select your role")
  }
  return (
    <div>
      <section className="relative flex flex-wrap lg:h-screen lg:items-center mt-5 bg-teal-100">
        <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">Welcome back 👋!</h1>

            <p className="mt-4 text-gray-500 text-xl">
              Login
            </p>
          </div>

          <form onSubmit={loginFunction} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <input
                  type="email"
                  name="email"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter email"
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>

              <div className="relative">
                <input
                  type="password"
                  name="password"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter password"
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                    className="size-4 text-gray-400"
                  >
                    <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" />
                  </svg>
                </span>
              </div>
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative">
               <select  onChange={handleSelectChange}
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-lg shadow-sm"
                  id="">
                    <option value="">I am</option>
                    <option value="farmer">Farmer</option>
                    <option value="consumer">Consumer</option>
                  </select>

                {/* <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span> */}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                No account?
                <Link className="underline" to={`/register`}>
                  Sign up
                </Link>
              </p>

              <button
                type="submit"
                className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>

        <div className="relative h-screen w-full sm:h-96 lg:h-full lg:w-1/2 border-3">
          <img
            alt=""
            className="h-full"
src="https://images.unsplash.com/photo-1595853035070-59a39fe84de3?q=80&w=1450&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"          />
        </div>
      </section>
    </div>
  );
};

export default Login;
