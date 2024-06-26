import React from 'react'
import {Link} from "react-router-dom"

const FarmerRegister = () => {
  return (
    <div>
        <section className="bg-white">

<div className="lg:grid lg:min-h-screen lg:grid-cols-12">
  {/* <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
    <img
      alt=""
src='https://images.unsplash.com/photo-1595206133361-b1fe343e5e23?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'        className="absolute inset-0 h-full w-full object-cover"
    />
  </aside> */}
  <main
    className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
  >
    <div className="max-w-xl lg:max-w-3xl">
     

      <h1 className="mt-6 text-2xl font-bold text-teal-700 sm:text-3xl md:text-4xl">
        Farmer Profile Update
      </h1>

      <p className="mt-4 leading-relaxed text-gray-500">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam,
        quibusdam aperiam voluptatum.
      </p>

      <div action="#" className="mt-8 grid grid-cols-6 gap-6">
        <div className="col-span-6 sm:col-span-3">
          <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
            First Name
          </label>

          <input
            type="text"
            id="FirstName"
            name="first_name"
            placeholder='First Name'
            className="mt-1 h-10 w-full rounded-md p-1 border-gray-200 bg-white  text-gray-700 shadow-sm"
          />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>

          <input
            type="text"
            id="LastName"
            name="last_name"
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
            name="phone"
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
            name="password_confirmation"
            className="mt-1 w-full h-10 p-1 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
          />
        </div>

      
        <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
         
          <p className="mt-4 text-sm text-gray-500 sm:mt-0">
           Please fill correct details
          </p>
        </div>
       

      </div>
    </div>
  </main>
  <main
    className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
  >
    <div className="max-w-xl lg:max-w-3xl">
     

      <h2 className="mt-6 text-2xl font-bold text-teal-900 sm:text-3xl md:text-4xl">
       Additional Details
      </h2>

      <p className="mt-4 leading-relaxed text-gray-500">
      Consumer will view  This  Information
      </p>

      <div action="#" className="mt-8 grid grid-cols-6 gap-6">
        <div className="col-span-6 sm:col-span-3">
          <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
            First Name
          </label>

          <input
            type="text"
            id="FirstName"
            name="first_name"
            placeholder='First Name'
            className="mt-1 h-10 w-full rounded-md p-1 border-gray-200 bg-white  text-gray-700 shadow-sm"
          />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>

          <input
            type="text"
            id="LastName"
            name="last_name"
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
            name="phone"
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
            name="password_confirmation"
            className="mt-1 w-full h-10 p-1 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
          />
        </div>

      

       

        <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
          <button
            className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
          >
            Create an account
          </button>

          <p className="mt-4 text-sm text-gray-500 sm:mt-0">
            Already have an account?
            <Link to={'/login'} className="text-gray-700 underline">Log in</Link>.
          </p>
        </div>
        <div className="col-span-6">
          <p className="text-sm text-teal-500">
           Are You Farmer? 
            <a href="#" className="text-blue-700 underline"> Register Here</a>
            
          </p>
        </div>
      </div>
    </div>
  </main>
</div>
</section>
    </div>
  )
}

export default FarmerRegister