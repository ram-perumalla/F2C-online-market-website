import React from 'react'
import {Link} from "react-router-dom"
import { url } from '../AxiosAPI';
const FarmerProfile = () => {
    const user={name:"lalit"}
    const {farmer}= JSON.parse(sessionStorage.getItem("login"));
  return (
    <a
    href="#"
    className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 bg-slate-300"
  >
    <span
      className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
    ></span>
  
    <div className="sm:flex sm:justify-between sm:gap-4">
      <div>
        <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
          {farmer?.firstname} &nbsp;{farmer?.lastname} 
        </h3>
  
        <p className="mt-1 text-xs font-medium text-gray-600"></p>
      </div>
  
      <div className="hidden sm:block sm:shrink-0">
        <img
          alt=""
          src={`${url}Farmer/${farmer.Avatar}`}
          className="size-16 rounded-lg object-cover shadow-sm"
        />
      </div>
    </div>
  
    <div className="mt-4">
      <p className="text-pretty text-sm text-gray-500">
        {/* Lorem ipsum dolor sit, amet consectetur adipisicing elit. At velit illum provident a, ipsa
        maiores deleniti consectetur nobis et eaque. */}
      </p>
    </div>
  
    <dl className="mt-6 flex gap-4 sm:gap-6">
      <div className="flex flex-col-reverse">
        <dt className="text-sm font-medium text-gray-600">{farmer?.address}</dt>
        <dd className="text-xs text-gray-500">Address</dd>
      </div>
  
      <div className="flex flex-col-reverse">
        <dt className="text-sm font-medium text-gray-600">{farmer?.email}</dt>
        <dd className="text-xs text-gray-500">Email</dd>
      </div>
      <div className="flex flex-col-reverse">
        <dt className="text-sm font-medium text-gray-600">{farmer?.mobilenumber}</dt>
        <dd className="text-xs text-gray-500">Mobile</dd>
      </div>
    </dl>
    
  </a>
  )
}

export default FarmerProfile