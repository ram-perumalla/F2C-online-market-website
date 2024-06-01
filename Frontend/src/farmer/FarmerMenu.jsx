import React, { useState } from 'react'
import ViewProducts from '../home/ViewProducts'
import AddProduct from './AddProduct'
import ViewProductFarmer from './ViewProductFarmer'
import ViewOrdersFarmer from './ViewOrdersFarmer'
import FarmerProfile from './FarmerProfile'
import FarmerRegister from '../home/FarmerRegister'
import UpdateProfileFarmer from './UpdateProfileFarmer'
import { Link, useNavigate } from 'react-router-dom'
import { url } from '../AxiosAPI'
import UpdateProduct from './UpdateProduct'

const FarmerMenu = () => {
  const [activeLink, setActiveLink]=useState("");
  const navigateTo=useNavigate()
  const handleLinkClick=(click)=>{
    setActiveLink(click)
  }
  const login= JSON.parse(sessionStorage.getItem("login"));
  const {farmer}=login;
if(!login){
alert("please login");
navigateTo("/")
}
const [oneProduct ,setOneProducts]=useState()
const handleProductID=(id)=>{
  console.log(id);
  setOneProducts(id);
  handleLinkClick("updateProduct")
}

  return (
    <div>
         <div className="flex min-h-screen  bg-[url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center bg-no-repeat">
      <div className="flex-none border-e bg-white w-64  z-10 ">
    <span className="grid h-10 w--full place-content-center  bg-teal-100 ">
    Farmer
    </span>

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
       
          href="/"
          className={`" px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 block rounded-lg hover:text-gray-700 ${activeLink==="orders"?'bg-gray-100 block rounded-lg':""}"`}

          // className={`"hover:bg-gray-100 block rounded-lg hover:text-gray-700 px-4 py-2 text-sm font-medium text-gray-700" ${activeLink==="orders"?'bg-gray-100 block rounded-lg':""}`}
        >
          Home
        </a>
      </li>
      <li>
        <details className="group [&_summary::-webkit-details-marker]:hidden">
          <summary
            className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <span className="text-sm font-medium"> Products </span>

            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </summary>

          <ul className="mt-2 space-y-1 px-4">
            <li>
              <a
                href="#"
                onClick={()=>handleLinkClick("add")}
                className={`" px-4 py-2 text-center text-sm font-medium text-gray-500 hover:bg-gray-100 block rounded-lg hover:text-gray-700 ${activeLink==="add"?'bg-gray-100 block rounded-lg':""}"`}
              >
                Add Products
              </a>
            </li>

            <li>
              <a
                href="#"
                onClick={()=>handleLinkClick("view")}
                className={`"px-4 text-center py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 block rounded-lg hover:text-gray-700 ${activeLink==="view"?'bg-gray-100 block rounded-lg':""}"`}
              >
               View Products
              </a>
            </li>
          </ul>
        </details>
      </li>

      <li>
        <a
        onClick={()=>handleLinkClick("orders")}
          href="#"
          className={`" px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 block rounded-lg hover:text-gray-700 ${activeLink==="orders"?'bg-gray-100 block rounded-lg':""}"`}

          // className={`"hover:bg-gray-100 block rounded-lg hover:text-gray-700 px-4 py-2 text-sm font-medium text-gray-700" ${activeLink==="orders"?'bg-gray-100 block rounded-lg':""}`}
        >
          Orders
        </a>
      </li>

      {/* <li>
        <a
          href="#"
          className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        >
          Invoices
        </a>
      </li> */}

      <li>
        <details className="group [&_summary::-webkit-details-marker]:hidden">
          <summary
            className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <span className="text-sm font-medium"> Account </span>

            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </summary>

          <ul className="mt-2 space-y-1 px-4">
            <li>
              <a
        onClick={()=>handleLinkClick("profile")}
        href="#"
                className={`" px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 block rounded-lg hover:text-gray-700 ${activeLink==="profile"?'bg-gray-100 block rounded-lg':""}"`}

                // className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Profile
              </a>
            </li>

            <li>
              <a
                href="#"
                className={`" px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 block rounded-lg hover:text-gray-700 ${activeLink==="manage"?'bg-gray-100 block rounded-lg':""}"`}
                onClick={()=>handleLinkClick("manage")}

                // className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Manage Profile
              </a>
            </li>

            <li>
              <form action="#">
                <Link
                  to={`/`}
                  onClick={()=>sessionStorage.removeItem("login")}
                  className="w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-500 [text-align:_inherit] hover:bg-gray-100 hover:text-gray-700"
                >
                  Logout
                </Link>
              </form>
            </li>
          </ul>
        </details>
      </li>
    </ul>
    <hr className='mt-2' />
    <ul>
        <li>
         <a href="#" className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50"  onClick={()=>handleLinkClick("profile")}>
      <img
        alt=""
src={`${url}Farmer/${farmer.Avatar}`}        className="size-10 rounded-full object-cover"
      />

      <div>
        <p className="text-xs">
          <strong className="block font-medium">{farmer.firstname} {farmer.lastname}</strong>

          <span> {farmer.email} </span>
        </p>
      </div>
    </a>   
        </li>
    </ul>
  </div>

  <div className="ml-5 p-5 tex">
 {activeLink==="add"&&<AddProduct/>}
 {activeLink==="view"&&<ViewProductFarmer handleProductID={handleProductID}/>}
 {activeLink==="orders"&&<ViewOrdersFarmer/>}
 {activeLink==="profile"&&<FarmerProfile/>}
 {activeLink==="manage"&&<UpdateProfileFarmer/>}
 {activeLink==="updateProduct"&&<UpdateProduct oneProduct={oneProduct}/>}


 
  </div>
  
</div>

    </div>
  )
}

export default FarmerMenu