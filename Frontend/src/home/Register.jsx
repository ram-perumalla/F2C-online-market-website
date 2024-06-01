import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import AxiosAPI from '../AxiosAPI';
import { toast } from 'react-toastify';
const Register = () => {
    const [isChecked, setIsChecked] = useState(true)
const [image, setImage]=useState();
const navigateTo =useNavigate()
const handleImage=(e)=>setImage(e.target.files[0])
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
    
  }
  const handleSignUpForm=async(e)=>{
    e.preventDefault()
    const formData= new FormData(e.target);
    formData.append("Avatar", image)
    const formProps = Object.fromEntries(formData);
   if(isChecked){ //consumer
    try {
      const res= await AxiosAPI.post(`customer/register`, formData)
      console.log(res);
      toast.success(res.data.message+ " "+"Please Login");
      navigateTo("/")
      //alert("Please Login")
    } catch (error) {
      console.log(error);
    }
  }else{//farmer
    const res= await AxiosAPI.post(`farmer/register`, formData)
    console.log(res);
    toast.success(res.data.message+ " "+"Please Login");
    navigateTo("/")
   // alert("Please Login")
  }}
  return (
    <div>
      

<section className="bg-teal-200">

  <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
    <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
      <img
      className="h-full"
        alt=""
        src="https://images.unsplash.com/photo-1595853035070-59a39fe84de3?q=80&w=1450&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"          />
    
    </aside>

    <main
      className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
    >
      <div className="max-w-xl lg:max-w-3xl">
       

        <h1 className="mt-6 text-2xl font-bold text-teal-900 sm:text-3xl md:text-4xl">
           Registration
        </h1>

        <p className="mt-4 leading-relaxed text-gray-500">
         <label className='autoSaverSwitch relative inline-flex cursor-pointer select-none items-center'>
        <input
          type='checkbox'
          name='autoSaver'
          className='sr-only'
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span
          className={`slider mr-3 flex h-[26px] w-[50px] items-center rounded-full p-1 duration-200 ${
            isChecked ? 'bg-emerald-500' : 'bg-[#9090f7]'
          }`}
        >
          <span
            className={`dot h-[18px] w-[18px] rounded-full bg-white duration-200 ${
              isChecked ? 'translate-x-6' : ''
            }`}
          ></span>
        </span>
        <span className='label flex items-center text-lg font-medium text-black'>
          I am  <span className='pl-1'> {isChecked ? 'Consumer' : 'Farmer'} </span>
        </span>
      </label>
        </p>

        <form  className="mt-8 grid grid-cols-6 gap-6" onSubmit={handleSignUpForm}>
          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>

            <input
              type="text"
              id="FirstName"
              name="firstname"
              placeholder='First Name'
              className="mt-1 h-10 w-full rounded-md p-1 border-gray-200 bg-white  text-gray-700 shadow-sm"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="Lastname" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>

            <input
              type="text"
              id="LastName"
              name="lastname"
              placeholder='Last Name'
              className="mt-1 w-full h-10 p-1 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Email </label>

            <input
              type="email"
              id="Email"
              name="email"
              placeholder=' Email'
              className="mt-1 w-full h-10 p-1 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Mobile Number </label>

            <input
              type="tel"
              id="phone"
              name="mobilenumber"
              placeholder=' Phone Number'
              className="mt-1 w-full h-10 p-1 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>

            <input
              type="password"
              id="Password"
              name="password"
              placeholder='****'
              className="mt-1 w-full p-1 h-10 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="PasswordConfirmation" className="block text-sm font-medium text-gray-700">
              Password Confirmation
            </label>

            <input
              type="password"
              id="PasswordConfirmation"
              name="confirmpassword"
              className="mt-1 w-full h-10 p-1 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
          <div className="col-span-6 ">
            <label htmlFor="PasswordConfirmation" className="block text-sm font-medium text-gray-700">
              Address
            </label>

            <textarea
              name="address"
              className="mt-1 w-full h-14 p-1 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
          <div className="col-span-6 ">
            <label htmlFor="PasswordConfirmation" className="block text-sm font-medium text-gray-700">
              Photo
            </label>

            <input
              type="file"
              onChange={handleImage}
              
              className="mt-1 w-full h-10 p-1 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

         

          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
            <button
              className="inline-block shrink-0 rounded-md border border-blue-600 bg-teal-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
            >
              Create an account
            </button>

            <p className="mt-4 text-sm text-gray-500 sm:mt-0">
              Already have an account?
              <Link to={'/login'} className="text-gray-700 underline">Log in</Link>.
            </p>
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
</section>
    </div>
  )
}

export default Register