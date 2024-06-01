import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AxiosAPI, { url } from '../AxiosAPI';

const ViewOrders = () => {
  const { user } = JSON.parse(sessionStorage.getItem("login"));
const [orders, setOrders]=useState()
const getOrders=async()=>{
  try {
    const res=await AxiosAPI.get(`customer/orders/${user._id}`);
    console.log(res.data.orders);
    setOrders(res.data.orders);
  } catch (error) {
    console.log(error);
  }
}
useEffect(()=>{
  getOrders();
}, [])
  return (
    <div className=" p-2 sm:p-4 dark:text-gray-800 w-full text-wrap">
      <h2 className="mb-4 text-2xl font-semibold leading-tight">Orders</h2>
      <div className="overflow-x-auto ">
        <table className="w-full p-6 text-xl text-left whitespace-nowrap border-2">
        
          <thead>
            <tr className="dark:bg-gray-300">
              <th className="p-3">Order ID</th>
              {/* <th className="p-3">Customer</th> */}
              <th className="p-3">Product</th>
              {/* <th className="p-3">Quantity</th>
              <th className="p-3">Price</th> */}
              <th className="p-3">Shipping Details</th>
              <th className="p-3">Payment Status</th>
              {/* <th className="p-3">productdetails
                <span className="">Actions</span>
              </th> */}
            </tr>
          </thead>
          <tbody className="border-b dark:bg-gray-50 dark:border-gray-300">
          {orders&&orders.map( (item)=> <tr className='border-2 text-wrap'key={item._id}>
              <td className="px-3 py-2">{item._id}</td>
              {/* <td className="px-3 py-2">John Doe</td> */}
              <td className="px-3 py-2">
               
               {item.productdetails.map((product)=><ol className='list-item'>
                <li>{product.productname}</li>
              
                <li>  <img
                         src={`${url}products/${product.ProductImage[0]}`}
                        alt=""
                        className="size-16 rounded object-cover"
                      />
</li>
<li>Price: ₹{product.discount}</li>
<hr />
               </ol>)}
              </td>
              {/* <td className="px-3 py-2">5</td>
              <td className="px-3 py-2">$15.00</td> */}
              <td className="px-3 py-2">{item.full_name}, {item.mobileNumber}, {item.city}, {item.state}, {item.country}, {item.zipcode}</td>
              <td className="px-3 py-2">{item.payment?.method==="card"?"Paid":"Not Paid(COD)"}</td>
            
            </tr>)}
           
             
              {/*  <tr><td className="px-3 py-2">
              <select name="" id=""> <td className="px-3 py-2">ORD002</td>
              <td className="px-3 py-2">Jane Smith</td>
              <td className="px-3 py-2">Oranges</td>
              <td className="px-3 py-2">10</td>
              <td className="px-3 py-2">$20.00</td>
              <td className="px-3 py-2"><Link to={'/payment'} className='bg-teal-500 rounded p-2'>Make Payment</Link></td>
              <td className="px-3 py-2">Shipped</td>
              <option value="">Select</option>
                <option value="">Cancel</option>
                <option value="">Return</option>
              </select>
              </td></tr> */}
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewOrders;
