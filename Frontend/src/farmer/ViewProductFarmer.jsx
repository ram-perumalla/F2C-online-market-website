import React, { useEffect, useState } from "react";
import AxiosAPI from "../AxiosAPI";
import { toast } from "react-toastify";
import moment from "moment";

const ViewProductFarmer = ({handleProductID}) => {
  const [showDeleteButtons, setShowDeleteButtons] = useState([]);
  const {farmer}= JSON.parse(sessionStorage.getItem("login"));
  const [products , setProducts]=useState();
const getProducts=async()=>{
  try {
    const res = await AxiosAPI.get(`farmer/products/${farmer._id}`);
    setProducts(res.data.Product)
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}
useEffect(()=>{getProducts()}, [])
  const toggleDeleteButtons = (index) => {
    setShowDeleteButtons((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  // Dummy data for contacts
 const handleDeleteProduct=async(id)=>{
  try {
    const res = await AxiosAPI.delete(`farmer/product/${id}`);
    console.log(res);
    toast.warning(res?.data.message);
    getProducts()
  } catch (error) {
    console.log(error);
  }
 }

  return (
    <div className="container p-2 mx-auto text-white sm:p-4 dark:text-gray-800 bg-green-800">
      <h2 className="mb-4 text-2xl font-semibold ">Products</h2>
      <div className="overflow-x-auto">
        <table className=" p-6 text-xl text-wrap text-left whitespace-nowrap">
          <thead>
            <tr className="dark:bg-gray-300">
              <th className="p-3">#</th>
              <th className="p-3">Product Name</th>
              <th className="p-3">Product Description</th>
              <th className="p-3">Shelf</th>
              <th className="p-3">Expiry</th>
              
              <th className="p-3">Amount</th>
              <th className="p-3">Qty</th>
              <th className="p-3">
                <span className="">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="dark:bg-gray-50 dark:border-gray-300">
            {products&&products.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="px-3 text-2xl font-medium dark:text-gray-600">
                  {index + 1}
                </td>
                <td className="px-3 py-2">
                  <p>{item.productname}</p>
                </td>
                <td className="px-3 py-2">
                  <span>{item.description}</span>
                  {/* <p className="dark:text-gray-600">{item.company}</p> */}
                </td>
                <td className="px-3 py-2">
                  <p>{item.shelflife}</p>
                </td>
                <td className="px-3 py-2">

                  <p>{moment(item.expiredate).format("DD/MM/YYYY")}</p>
                </td>
                <td className="px-3 py-2">
                  <p>{item.discount}</p>
                </td>
                <td className="px-3 py-2">
                  <p>{item.quantity}</p>
                </td>
                <td className="px-3 py-2">
                  <button
                    type="button"
                    title="Open details"
                    onClick={() => toggleDeleteButtons(index)}
                    className="p-1 rounded-full dark:text-gray-400 hover:dark:bg-gray-300 focus:dark:bg-gray-300"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                      <path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z"></path>
                    </svg>
                  </button>
                  {showDeleteButtons[index] && (
                    <div className="p-3 ">
                      {" "}
                      <button onClick={() => handleDeleteProduct(item._id)} className="font-medium p-2 text-red-500" >
                        Delete
                      </button>
                      <br />{" "}
                      <button onClick={() => handleProductID(item)} className="font-medium p-2 text-blue-500">
                        Update
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewProductFarmer;
