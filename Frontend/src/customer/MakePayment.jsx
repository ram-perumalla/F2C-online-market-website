import React, { useEffect, useState } from 'react'
import { useSearch } from '../home/SearchContext';
import AxiosAPI from '../AxiosAPI';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const MakePayment = () => {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Cancel the event
      event.preventDefault();
      // Chrome requires returnValue to be set
      event.returnValue = '';
      // Show confirmation message
      const confirmationMessage = 'Are you sure you want to leave this page?';
      event.returnValue = confirmationMessage;
      return confirmationMessage;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const {shippingDetails, productQuantities, totalAmount, setShippingDetails}=useSearch()
    const [paymentMethod, setPaymentMethod]=useState();
const [cardnumber, setCardNumber]=useState();
const[expire, setExpire]=useState();
const [cvv , setCvv]=useState()
    // console.log(shippingDetails, productQuantities);

    const selectPaymentMethod=(value)=>{
        setPaymentMethod(value)
    }
    
    const placeOrder=async()=>{
      setShippingDetails({...shippingDetails ,payment: {method:paymentMethod, cardnumber:cardnumber, expire:expire, cvv:cvv}});
      try {
        setIsPaymentProcessing(true);

        // Simulate payment processing for 2 seconds
        setTimeout(() => {
          // After 2 seconds, hide the payment processing spinner
          setIsPaymentProcessing(false);
          
          // Show the order placed message and button
          setIsOrderPlaced(true);
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    };
  const { user } = JSON.parse(sessionStorage.getItem("login"));
const navigateTo=useNavigate()
    const placeOrderDetails=async()=>{
try {
  const response = await AxiosAPI.post(`/customer/orders/${user._id}`, shippingDetails);
      console.log("Response from backend:", response.data.message);
    toast.success(response?.data?.message);
    navigateTo("/consumer")
} catch (error) {
  console.log(error);
}
      
    }
  return (
    <div>
        <div className="flex items-center justify-center w-screen min-h-screen bg-gray-100 text-gray-800 p-8 bg-[url(/shell6.jpg)] bg-cover bg-center bg-no-repeat">
  <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 w-full max-w-screen-lg">
    <div className="lg:col-span-2">
    <p className="text-red-500">Please don't refresh the page </p>

      <h2 className="text-sm font-medium">Payment Method</h2>
      <div className="bg-white rounded mt-4 shadow-lg">
        <div className="flex items-center px-8 py-5 ">
          <input
            className={`appearance-none w-4 h-4 rounded-full border-2 border-white ring-2 ring-blue-600 ring-opacity-100 ${paymentMethod==="cod"?"bg-blue-500":""}`}
            type="radio"
            value={"cod"}
            onClick={(e)=>selectPaymentMethod(e.target.value)}
            name='paymentMethod'
          />
          
          <label className="text-sm font-medium ml-4">Cash on Delivery</label>
        </div>
        {/* <div className="flex items-center px-8 py-5 border-t">
          <input
            className={`appearance-none w-4 h-4 rounded-full border-2 border-white ring-2 ring-blue-600 ring-opacity-100 ${paymentMethod==="upi"?"bg-blue-500":""}`}
            type="radio"
            onClick={(e)=>selectPaymentMethod(e.target.value)}
            value={"upi"}
            name='paymentMethod'
          />
          <label className="text-sm font-medium ml-4">UPI</label>
        </div> */}
       {/* {paymentMethod==="upi"&& <div className="grid grid-cols-2 gap-4 px-8 pb-8">
            <div className="col-span-2">
              <label className="text-xs font-semibold" htmlFor="cardNumber">
               VPA/UPI ID
              </label>
              <input

                className="flex items-center h-10 border mt-1 rounded px-4 w-full text-sm"
                type="text"
                placeholder="e.g- 9876543210@bank"
              />
            </div>
          
          </div>} */}
        <div className="border-t">
          <div className="flex items-center px-8 py-5">
            <input
            name='paymentMethod'
            value={"card"}
            className={`appearance-none w-4 h-4 rounded-full border-2 border-white ring-2 ring-blue-600 ring-opacity-100 ${paymentMethod==="card"?"bg-blue-500":""}`}

            onClick={(e)=>selectPaymentMethod(e.target.value)}
              //className={`"appearance-none w-4 h-4 rounded-full border-2 border-white ring-2 ring-blue-600  ring-opacity-100 " ${paymentMethod==="card"?"bg-blue-600":''}`}
              type="radio"
            />
            <label className="text-sm font-medium ml-4">Debit/Credit Card</label>
          </div>
          
          {paymentMethod==="card"&&(<div className="grid grid-cols-2 gap-4 px-8 pb-8">
            <div className="col-span-2">
              <label className="text-xs font-semibold" htmlFor="cardNumber">
                Card number
              </label>
              <input
                className="flex items-center h-10 border mt-1 rounded px-4 w-full text-sm"
                type="text"
                onChange={(e)=>setCardNumber(e.target.value)}
                placeholder="0000 0000 0000 0000"
              />
            </div>
            <div className="">
              <label className="text-xs font-semibold" htmlFor="cardNumber">
                Expiry Date
              </label>
              <input
                className="flex items-center h-10 border mt-1 rounded px-4 w-full text-sm"
                type="month"
                placeholder="MM/YY"
                onChange={(e)=>setExpire(e.target.value)}
              />
            </div>
            <div className="">
              <label className="text-xs font-semibold" htmlFor="cardNumber">
                CVC/CVV
              </label>
              <input
                className="flex items-center h-10 border mt-1 rounded px-4 w-full text-sm"
                type="password"
                onChange={(e)=>setCvv(e.target.value)}
                placeholder="..."
                maxLength={3}
              />
            </div>
          </div>)}
        </div>
      </div>
    </div>
    <div>
      <h2 className="text-sm font-medium">Purchase Summary</h2>
      <div className="bg-white rounded mt-4 shadow-lg py-6">
        <div className="px-8">
          <div className="flex items-end">
            {/* <select
              className="text-sm font-medium focus:outline-none -ml-1"
              name=""
              id=""
            >
              <option value="">Product (Billed Monthly)</option>
              <option value="">Product (Billed Annually)</option>
            </select> */}
            Amount 
            <span className="text-sm ml-auto font-semibold">₹ {totalAmount}</span>
            <span className="text-xs text-gray-500 mb-px"></span>
          </div>
          <span className="text-xs text-gray-500 mt-2">
            {/* Save 20% with annual billing */}
          </span>
        </div>
        <div className="px-8 mt-4">
          {/* <div className="flex items-end justify-between">
            <span className="text-sm font-semibold">Delivery Charges</span>
            <span className="text-sm text-gray-500 mb-px">$40</span>
          </div> */}
        </div>
        <div className="px-8 mt-4 border-t pt-4">
          <div className="flex items-end justify-between">
            <span className="font-semibold">Total Amount</span>
            <span className="font-semibold">₹ {totalAmount}</span>
          </div>
          <span className="text-xs text-gray-500 mt-2">
            {/* After 1 month free: $22/mo. */}
          </span>
        </div>
        <div className="flex items-center px-8 mt-8">
          {/* <input id="termsConditions" type="checkbox" /> */}
          <label
            className="text-xs text-gray-500 ml-2"
            htmlFor="termsConditions"
          >
            {/* I agree to the terms and conditions. */}
          </label>
        </div>
        <div className="flex flex-col px-8 pt-4">

      {!isPaymentProcessing && !isOrderPlaced && (
        <button onClick={placeOrder} className="flex items-center justify-center bg-blue-600 text-sm font-medium w-full h-10 rounded text-blue-50 hover:bg-blue-700">
        Make Payment
      </button>
      )}

      {/* Loading Spinner */}
      {isPaymentProcessing && (
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-600"></div>
      )}

      {/* Order Placed Message and Button */}
      {isOrderPlaced && (
        <div>
         <button onClick={placeOrderDetails} className="flex items-center justify-center mt-3 bg-green-600 text-sm font-medium w-full h-10 rounded text-blue-50 hover:bg-blue-700">
            Place Order
          </button>
        </div>
      )}
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
  )
}

export default MakePayment