import React, { useEffect, useState } from 'react'
import AxiosAPI, { url } from '../AxiosAPI'
import { Link, useNavigate } from 'react-router-dom'
import { useSearch } from './SearchContext'
import { toast } from 'react-toastify'
export const arr= [1,2,3,4,5,6, 7,8,9,10,]
 
const ViewProducts = () => {
 

  const [products, setProducts]=useState();
  const navigateTo= useNavigate()
  const getProducts=async()=>{
    try {
     const res= await AxiosAPI.get(`customer/allproducts`);
    //  console.log(res);
    setProducts(res.data.data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getProducts()
  }, []);
  const addtoCartFuction=async(productId)=>{
    const {user}= JSON.parse(sessionStorage.getItem("login"));
   if(user){
    try {
      const res= await AxiosAPI.post(`customer/cart/${user._id}/${productId}`);
      console.log(res);
      toast.success(res.data.message)
    } catch (error) {
      console.log(error);
      toast.warning(error.response?.data.message)
    }
   }else{
     
    alert("please Login with consumer credentials")
   }
  }
  
  return (
    <div>
        <div className=' justify-center  w-5/6 align-middle align-content-between ml-auto mr-auto '>
        <article className="rounded-xl border border-gray-700  bg-[url(/farm2.jpg)] bg-cover bg-center bg-no-repeat p-6">
  <div className="flex items-center gap-4">
   

    <div>
      <h3 className="text-lg font-medium text-white">Explore Now</h3>

      <div className="flow-root">
     
      </div>
    </div>
  </div>

  <ul className="mt-4 space-y-2">
    <li>
      <a href="#" className="block h-full rounded-lg p-4 hover:border-pink-600">
        <strong className="font-extrabold text-3xl text-green-400 ">Farmer to consumer</strong>

        <p className="mt-1 text-sm font-medium text-black">
        Online Farmer-to-Consumer Marketplace
        </p>
      </a>
    </li>

    
  </ul>
</article></div>
        <div className="flex flex-wrap justify-center gap-6 p-6 "> 
        
        {products && products.map((items) => (
  <div key={items._id} className="bg-white shadow-md rounded-lg max-w-60 dark:bg-gray-800 dark:border-gray-700">
    <button onClick={()=>{
       return navigateTo(`/view/product/${items._id}`,{state:items})
      }}>
      <img
        className="rounded-t-lg p-2 h-40 w-40 object-cover"
        src={`${url}products/${items.ProductImage[0]}`}
        alt="product image"
      />
    </button>
    <div className="px-5 pb-5">
      <button type='button' onClick={()=>{
       return navigateTo(`/view/product/${items._id}`,{state:items})
      }}>
        <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">
          {items.productname}
        </h3>
      </button>
      <div className="flex items-center mt-2.5 mb-5 overflow-hidden" style={{ maxHeight: '3em' }}>
        {items.description}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold text-gray-900 dark:text-white">
          ₹ {items.discount}
        </span>
        <button onClick={()=>addtoCartFuction(items._id)}
          
          className="text-white bg-teal-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-3"
        >
          Add to cart
        </button>
      </div>
    </div>
  </div>
))}


</div>

    </div>
  )
}

export default ViewProducts
{/*<div className="bg-white shadow-md rounded-lg max-w-60 dark:bg-gray-800 dark:border-gray-700">
    <a href="/view/product">
      <img
        className="rounded-t-lg p-8"
        src="corriender.png"
        alt="product image"
      />
    </a>
    <div className="px-5 pb-5">
      <a href="#">
        <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">
          Corriender
        </h3>
      </a>
      <div className="flex items-center mt-2.5 mb-5">
        <svg
          className="w-5 h-5 text-yellow-300"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
        <svg
          className="w-5 h-5 text-yellow-300"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
        <svg
          className="w-5 h-5 text-yellow-300"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
        <svg
          className="w-5 h-5 text-yellow-300"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
        <svg
          className="w-5 h-5 text-yellow-300"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
          5.0
        </span>
        Description about product
      </div>
      <div className="flex items-center justify-between">
        ₹ <span className="text-3xl font-bold text-gray-900 dark:text-white">
        599
        </span>
        <a
          href="#"
          className="text-white bg-teal-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add to cart
        </a>
      </div>
    </div>
</div>*/}