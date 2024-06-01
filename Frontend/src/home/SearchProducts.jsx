import React, { useEffect, useState } from 'react'
import AxiosAPI, { url } from '../AxiosAPI'
import { Link, useNavigate } from 'react-router-dom'
import { useSearch } from './SearchContext';


const SearchProducts = () => {
  const [products, setProducts]=useState();
  const navigateTo= useNavigate()
  const { searchTerm, setSearchTerm } = useSearch();
  
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
     
    // alert("please Login with consumer credentials")
   }
  }
  const getProducts=async()=>{
    try {
     const res= await AxiosAPI.get(`customer/allproducts`);
     console.log(res);
    setProducts(res.data.data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    // getProducts()
  }, [])
  return (
    <div>
      <div className="flex justify-end text-3xl p-3 ">  <button className='text-gray-700  w-3 rounded-xl 'onClick={()=>setSearchTerm("")}>X</button></div>
        <div className="flex flex-wrap justify-center gap-6 p-6 "> 
    
        {searchTerm && searchTerm.map((items) => (
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
        <button onClick={addtoCartFuction(items._id, navigateTo)}
          href="#"
          className="text-white bg-teal-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add to cart
        </button >
      </div>
    </div>
  </div>
))}


</div>

    </div>
  )
}

export default SearchProducts
