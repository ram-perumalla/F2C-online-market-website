import React, { useState } from 'react'
import AxiosAPI from '../AxiosAPI';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const UpdateProfileFarmer = () => {
  const navigateTo=useNavigate()
  const {farmer}= JSON.parse(sessionStorage.getItem("login"));
  const [image, setImage]=useState();
  const handleFile=(e)=>setImage(e.target.files[0]);
  const  handleUpdateSubmit=async(e)=>{
    e.preventDefault()
const formData= new FormData(e.target);
formData.append("Avatar", image);
//const formProps= Object.fromEntries(formData);
//console.log(formProps);
try {
const res=  await AxiosAPI.put(`farmer/profile/${farmer._id}`, formData);
console.log(res);
toast.success(res?.data.message);
sessionStorage.removeItem("login")
navigateTo("/")
} catch (error) {
  console.log(error);
}
  }
  return (
    <div>
         <main
      className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 bg-green-800 text-white"
    >
      <div className="max-w-xl lg:max-w-3xl">
       

        <h1 className="mt-6 text-2xl font-bold  sm:text-3xl md:text-4xl">
           Update
        </h1>

        

        <form action="#" className="mt-8 grid grid-cols-6 gap-6 text-black" onSubmit={handleUpdateSubmit}>
          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="FirstName" className="block text-sm font-medium ">
              First Name
            </label>

            <input
              type="text"
              id="FirstName"
              name="firstname"
              defaultValue={farmer?.firstname}
              placeholder='First Name'
              className="mt-1 h-10 w-full rounded-md p-1 border-gray-200 bg-white   shadow-sm"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="LastName" className="block text-sm font-medium ">
              Last Name
            </label>

            <input
              type="text"
              id="LastName"
              defaultValue={farmer?.lastname}

              name="lastname"
              placeholder='Last Name'
              className="mt-1 w-full h-10 p-1 rounded-md border-gray-200 bg-white text-sm  shadow-sm"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="Email" className="block text-sm font-medium "> Email </label>

            <input
              type="email"
              id="Email"
              name="email"
              defaultValue={farmer?.email}
              
              placeholder=' Email'
              className="mt-1 w-full h-10 p-1 rounded-md border-gray-200 bg-white text-sm  shadow-sm"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="Email" className="block text-sm font-medium "> Mobile Number </label>

            <input
              type="tel"
              id="phone"
              name="mobilenumber"
              placeholder=' Phone Number'
              defaultValue={farmer?.mobilenumber}

              className="mt-1 w-full h-10 p-1 rounded-md border-gray-200 bg-white text-sm  shadow-sm"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="Password" className="block text-sm font-medium "> Password </label>

            <input
              type="password"
              id="Password"
              defaultValue={farmer?.password}
              name="password"
              placeholder='****'
              className="mt-1 w-full p-1 h-10 rounded-md border-gray-200 bg-white text-sm  shadow-sm"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="PasswordConfirmation" className="block text-sm font-medium ">
              Password Confirmation
            </label>

            <input
              type="password"
              defaultValue={farmer?.confirmpassword}
              id="PasswordConfirmation"
              name="confirmpassword"
              className="mt-1 w-full h-10 p-1 rounded-md border-gray-200 bg-white text-sm  shadow-sm"
            />
          </div>
          <div className="col-span-6 ">
            <label htmlFor="PasswordConfirmation" className="block text-sm font-medium ">
              Address
            </label>

            <textarea
            placeholder='Address'
              defaultValue={farmer?.address}
              name="address"
              className="mt-1 w-full h-14 p-1 rounded-md border-gray-200 bg-white text-sm  shadow-sm"
            />
          </div>
          <div className="col-span-6 ">
            <label htmlFor="PasswordConfirmation" className="block text-sm font-medium ">
              Photo
            </label>

            <input
              type="file"
              
              onChange={handleFile}
              className="mt-1 w-full h-10 p-1 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

         

          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
            <button
              className="inline-block shrink-0 rounded-md border border-blue-600 bg-teal-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
            >
              Update an account
            </button>

           
          </div>
          {/* <div className="col-span-6">
            <p className="text-sm text-teal-500">
             Are You Farmer? 
              <a href="/register/farmer" className="text-blue-700 underline"> Register Here</a>
              
            </p>
          </div> */}
        </form>
      </div>
    </main>
    </div>
  )
}

export default UpdateProfileFarmer