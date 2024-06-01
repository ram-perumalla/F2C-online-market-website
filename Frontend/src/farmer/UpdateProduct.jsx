import React, { useState } from 'react'
import AxiosAPI from '../AxiosAPI';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const UpdateProduct = ({oneProduct}) => {
  const navigateTo=useNavigate()
  const {farmer}= JSON.parse(sessionStorage.getItem("login"));
  const [image, setImage]=useState();
  const handleFile=(e)=>setImage(e.target.files[0]);
  const  handleUpdateSubmit=async(e)=>{
    e.preventDefault()
const formData= new FormData(e.target);
formData.append("ProductImage", image);
const formProps= Object.fromEntries(formData);
console.log(formProps);
try {
const res=  await AxiosAPI.put(`farmer/product/${oneProduct._id}`, formData);
console.log(res);
toast.success(res?.data.message);

//navigateTo("/")
} catch (error) {
  console.log(error);
}
  }

  return (
    <div>
         <section className=" p-6  bg-teal-700 rounded-md shadow-md dark:bg-gray-800 justify-center">
    <h1 className="text-xl font-bold text-white capitalize dark:text-white">
      Update Product
    </h1>
    <form onSubmit={handleUpdateSubmit}>
      <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
        <div>
          <label className="text-white dark:text-gray-200" htmlFor="username">
           Product Name
          </label>
          <input
            id="productname"
            type="text"
            placeholder='Product Name'
            name='productname'
            defaultValue={oneProduct?.productname}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          />
        </div>
        <div>
          <label
            className="text-white dark:text-gray-200"
            htmlFor="emailAddress"
          >
             Quantity
          </label>
          <input
            id="emailAddress"
            placeholder='Quantity'
            defaultValue={oneProduct?.quantity}
            name='quantity'
            type="text"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          />
        </div>
        <div>
          <label className="text-white dark:text-gray-200" htmlFor="password">
            MRP
          </label>
          <input
            id="contact"
            type="text"
            defaultValue={oneProduct?.price}
            name='price'
            placeholder='In Rupees'
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          />
        </div>
        <div>
          <label
            className="text-white dark:text-gray-200"
            htmlFor="passwordConfirmation"
          >
           Discounted Amount
          </label>
          <input
            placeholder='In Rupees'
            id="passwordConfirmation"
            name='discount'
            defaultValue={oneProduct?.discount}
            type="text"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          />
        </div>
        <div>
          <label
            className="text-white dark:text-gray-200"
            htmlFor="passwordConfirmation"
          >
            Product Category
          </label>
          <select
            id="color"
            defaultValue={oneProduct?.category}
            name='category'
            type="text"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          >
            <option value="">--Select--</option>
            <option value="vegetables">Vegitable</option>
            <option value="milk">Milk</option>
          </select>
        </div>
        <div>
          <label
            className="text-white dark:text-gray-200"
            htmlFor="passwordConfirmation"
          >
            Shelf Life
          </label>
          {/* <select className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
            <option>Surabaya</option>
            <option>Jakarta</option>
            <option>Tangerang</option>
            <option>Bandung</option>
          </select> */}
           <input
            placeholder='In days'
            type="text"
            defaultValue={oneProduct?.shelflife}
            name='shelflife'
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          />
        </div>
        <div>
          <label
            className="text-white dark:text-gray-200"
            htmlFor="passwordConfirmation"
          >
       Mfg/producing  Date
          </label>
          <input
            id="range"
            defaultValue={oneProduct?.date}
            type="date"
            name='date'
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          />
        </div>
        <div>
          <label
            className="text-white dark:text-gray-200"
            htmlFor="passwordConfirmation"
          >
          Expiry Date
          </label>
          <input
            id="date"
            defaultValue={oneProduct?.expiredate}
            name='expiredate'
            type="date"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          />
        </div>
        <div>
          <label
            className="text-white dark:text-gray-200"
            htmlFor="passwordConfirmation"
          >
          Storage Instruction
          </label>
          <input
            defaultValue={oneProduct?.storageinstruction}
            name='storageinstruction'
            type="text"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          />
        </div>
        <div>
          <label
            className="text-white dark:text-gray-200"
            htmlFor="passwordConfirmation"
          >
          How to Use
          </label>
          <input
            defaultValue={oneProduct?.howtouse}
            name='howtouse'
            type="text"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          />
        </div>
        <div>
          <label
            className="text-white dark:text-gray-200"
            htmlFor="passwordConfirmation"
          >
            Product Description
          </label>
          <textarea
            id="textarea"
            name='description'
            defaultValue={oneProduct?.description}

            placeholder='Product Description'
            rows={5}
            type="textarea"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
           
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white">Poster</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-white"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span className="">Upload a file</span>
                  <input
                    id="file-upload"
                    onChange={handleFile}
                    // name="file-upload"
                    type="file"
                    className="sr-only"
                  />
                </label>
                
              </div>
              <p className="text-xs text-white">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <button type='submit' className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
          Add
        </button>
      </div>
    </form>
  </section>
    </div>
  )
}

export default UpdateProduct