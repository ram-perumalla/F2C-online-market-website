import React, { useEffect, useState } from 'react';
import AxiosAPI from '../AxiosAPI';
import {  jsPDF } from 'jspdf'; // Import jsPDF library
import 'jspdf-autotable';

const ViewOrdersFarmer = () => {
  const {farmer}= JSON.parse(sessionStorage.getItem("login"));
  const [orders, setOrders]=useState()
  const getOrders=async()=>{
    try {
      const response= await AxiosAPI.get(`farmer/orders/${farmer._id}`);
      console.log(response);
      setOrders(response.data.data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{getOrders()}, []);
  const sendOrderStatus=async (id, status)=>{
    try {
      const res= await AxiosAPI.put(`farmer/orders/${farmer._id}/${id}`, {status: status});
      getOrders();
    } catch (error) {
      console.log(error);
    }
  }

  const downloadOrders = () => {
    const doc = new jsPDF();
    const tableHeaders = [
      'Order ID',
      'Customer',
      'Product',
      'Quantity',
      'Price',
      'Shipping Details',
      'Payment Status'
    ];

    const tableData = orders.map(item => [
      item._id,
      item.full_name,
      item.orderedProduct.productname,
      item.orderedProduct.orderquantity,
      `$${item.orderedProduct.orderquantity * item.orderedProduct.discount}`,
      `${item.mobileNumber}, ${item.city}, ${item.state}, ${item.country}, ${item.zipcode}`,
      item.payment?.method === 'card' ? 'Paid' : 'Not Paid(COD)'
    ]);

  doc.autoTable({
  head: [tableHeaders],
  body: tableData,
  startY: 20, // Adjust starting position on the page
  styles: {
    fontSize: 10, // Set font size for table content
    cellPadding: 5 // Adjust cell padding for better formatting
  }
});


    doc.save('orders.pdf'); // Download the PDF with filename 'orders.pdf'
  };// Download the PDF with filename 'orders.pdf'
  



  return (
    <div className=" -ml-3 w-full bg-green-800 text-white text-wrap rounded">
      <h2 className=" text-center">Orders</h2>
      <div className="">
        <table className="">
        
          <thead>
            <tr className="dark:bg-gray-300 border-b">
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Product</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Price</th>
              <th className="p-3">Shipping Details</th>

              {/* <th className="p-3">Status</th> */}
              <th className="p-3">Payment Status</th>
              {/* <th className="p-3">
                <span className="">Actions</span>
              </th> */}
            </tr>
          </thead>
          <tbody className="border-b ">
           {orders&&orders.map((item)=> <tr className='border-b' key={item._id}>
              <td className="px-3 py-2">{item._id}</td>
              <td className="px-3 py-2">{item.full_name}</td>
              <td className="px-3 py-2">{item.orderedProduct.productname}</td>
              <td className="px-3 py-2">{item.orderedProduct.orderquantity}</td>
              <td className="px-3 py-2">${item.orderedProduct.orderquantity*item.orderedProduct.discount}</td>
              <td className="px-3 py-2">{item.mobileNumber}, {item.city},{item.state}, {item.country}, {item.zipcode}</td>

              {/* <td className="px-3 py-2">{item.orderedProduct.status}</td> */}
              <td className="px-3 py-2">{item.payment?.method==="card"?"Paid":"Not Paid(COD)"}</td>
              <td className="px-3 py-2">
              {/* <select name="" id="" className='text-black' onChange={(e)=>sendOrderStatus(item.orderedProduct._id, e.target.value )}>
              <option value="">Select</option>
                <option value="Pending">Accept</option>
                <option value="Processed">Processed</option>
                <option value="Out of Stock">Processed</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select> */}
              </td>
            </tr>)}
            {/* <tr>
              <td className="px-3 py-2">ORD002</td>
              <td className="px-3 py-2">Jane Smith</td>
              <td className="px-3 py-2">Oranges</td>
              <td className="px-3 py-2">10</td>
              <td className="px-3 py-2">$20.00</td>
              <td className="px-3 py-2">Shipped</td>
              <td className="px-3 py-2">Paid</td>
              <td className="px-3 py-2">
              <select name="" id="" className='text-black'>
                <option value="">Select</option>
                <option value="">Pending</option>
                <option value="">Not Available</option>
                <option value="">Accept</option>
                <option value="">Reject</option>
              </select>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
      <button onClick={downloadOrders}>Download Orders as PDF</button>

    </div>
  );
};

export default ViewOrdersFarmer;
