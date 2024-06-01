import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import FarmerProfile from '../farmer/FarmerProfile';
import ViewOrders from './ViewOrders';
import UpdateProfileFarmer from '../farmer/UpdateProfileFarmer';
import CosumerProfile from './CosumerProfile';
import UpdateProfileCustomer from './UpdateProfileCustomer';
import AxiosAPI, { url } from '../AxiosAPI';

const CustomerMenu = () => {
  const [activeLink, setActiveLink]=useState("home");
  const [searchQuery , setSearchQuery]=useState()
  const handleSearch=(e)=>setSearchQuery(e.target.value)
  const handleLinkClick=(click)=>{
    setActiveLink(click)
  }
  const {user}= JSON.parse(sessionStorage.getItem("login"));
const searchProducts=async()=>{
  try {
    const res= await AxiosAPI.get(`customer/products?name=${searchQuery}`)
  } catch (error) {
    console.log();
  }
}
  return (  
    <div>
         <div className="flex h-full ">
      <div className="flex-none border-e bg-white w-64  z-10">
    <Link to={`/`} className="grid h-10 w--full place-content-center  bg-teal-100 ">
    Consumer
    </Link>

    <ul className="mt-6 space-y-1">
      {/* <li>
        <a
        onClick={()=>handleLinkClick("home")}
          href="#"
          className={`" px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 block rounded-lg hover:text-gray-700 ${activeLink==="home"?'bg-gray-100 block rounded-lg':""}"`}
          
          // className={`"hover:bg-gray-100 block rounded-lg  px-4 py-2 text-sm font-medium text-gray-700" ${activeLink==="home"?'bg-gray-100 block rounded-lg':""}`}
        >
          Home
        </a>
      </li> */}
      <li>
        <a
        onClick={()=>handleLinkClick("orders")}
          href="#"
          className={`" px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 block rounded-lg hover:text-gray-700 ${activeLink==="orders"?'bg-gray-100 block rounded-lg':""}"`}
          
          // className={`"hover:bg-gray-100 block rounded-lg  px-4 py-2 text-sm font-medium text-gray-700" ${activeLink==="home"?'bg-gray-100 block rounded-lg':""}`}
        >
          Orders
        </a>
      </li>
      <li>
        <a
        onClick={()=>handleLinkClick("profile")}
          href="#"
          className={`" px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 block rounded-lg hover:text-gray-700 ${activeLink==="profile"?'bg-gray-100 block rounded-lg':""}"`}
          
          // className={`"hover:bg-gray-100 block rounded-lg  px-4 py-2 text-sm font-medium text-gray-700" ${activeLink==="home"?'bg-gray-100 block rounded-lg':""}`}
        >
          Profile
        </a>
      </li>
      <li>
        <a
        onClick={()=>handleLinkClick("manage")}
          href="#"
          className={`" px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 block rounded-lg hover:text-gray-700 ${activeLink==="manage"?'bg-gray-100 block rounded-lg':""}"`}
          
          // className={`"hover:bg-gray-100 block rounded-lg  px-4 py-2 text-sm font-medium text-gray-700" ${activeLink==="home"?'bg-gray-100 block rounded-lg':""}`}
        >
          Manage Profile
        </a>
      </li>
    

    

    
    </ul>
    <hr className='mt-2' />
    <ul>
        <li   onClick={()=>handleLinkClick("profile")}>
         <a href="#" className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
      <img
        alt=""
        src={`${url}customer/${user?.Avatar}`}        className="size-10 rounded-full object-cover"
      />

      <div>
        <p className="text-xs">
          <strong className="block font-medium">{user.firstname} {user.lastname}</strong>

          <span> {user.email} </span>
        </p>
      </div>
    </a>   
        </li>
        <li>
        <a
   
          href="/"
          className={`" px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 block rounded-lg hover:text-gray-700 ${activeLink===""?'bg-gray-100 block rounded-lg':""}"`}
          onClick={()=>sessionStorage.removeItem("login")}
          
          // className={`"hover:bg-gray-100 block rounded-lg  px-4 py-2 text-sm font-medium text-gray-700" ${activeLink==="home"?'bg-gray-100 block rounded-lg':""}`}
        >
          Logout
        </a>
      </li>
    </ul>
  </div>

  <div className="ml-5 p-5">
 {/* {activeLink==="add"&&<AddProduct/>}
 {activeLink==="view"&&<ViewProductFarmer/>}
 {activeLink==="orders"&&<ViewOrdersFarmer/>}
 */}
 {activeLink==="manage"&&<UpdateProfileCustomer/>}
{activeLink==="profile"&&<CosumerProfile/>}
{activeLink==="orders"&&<ViewOrders/>}

 
  </div>
  
</div>

    </div>
  )
}

export default CustomerMenu