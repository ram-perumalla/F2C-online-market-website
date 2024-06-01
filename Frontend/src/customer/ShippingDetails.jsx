import React, { useEffect } from "react";
import AxiosAPI from "../AxiosAPI";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../home/SearchContext";

const ShippingDetails = ({ totalAmount}) => {
  const {setShippingDetails, shippingDetails, productQuantities}=useSearch()
  const navigateTo=useNavigate()
  // const handleSubmitShipping=async(e)=>{
  //   e.preventDefault()
  //   const formData= new FormData(e.target);
  //   formData.append("products", Object.entries(productQuantities).map(([productId, quantity]) => {
  //   return { productid: productId, quantity };
  // }),)
  //   const formProps= Object.fromEntries(formData);

  //   console.log(formProps, productQuantities, totalAmount);
  // }
  // Object.entries(productQuantities).map(([productId, quantity]) => {
  //   // Do something with productId and quantity
  //   console.log(`Product ID: ${productId}, Quantity: ${quantity}`);
  // });
  // end point : "customer/order/customerId"{productId, quantity , shipping details}
  const { user } = JSON.parse(sessionStorage.getItem("login"));
const {register ,handleSubmit}=useForm()
  const handleSubmitShipping = async (data) => {

    // e.preventDefault();
    // console.log(e.target)
  
    // Create FormData object from the form
    // const formData = new FormData(e.target);
  
    // Transform productQuantities into the desired format
    const products = Object.entries(productQuantities).map(([productId, quantity]) => {
      return { productid: productId, quantity };
    });
  data.products=products;
    // Set the 'products' field in the FormData object
    // formData.append("products", JSON.stringify(products));
  
    // Convert FormData object to plain JavaScript object
  //   const formProps = Object.fromEntries(formData);
  // console.log((formProps));
    // Send the data to the backend
    try {
      // const response = await AxiosAPI.post(`/customer/orders/${user._id}`, data);
      // console.log("Response from backend:", response.data.message);
      // toast.success(response?.data?.message)
      setShippingDetails(data);
      navigateTo("/payment");
    } catch (error) {
      toast.error(error?.response.data.message)
      console.error("Error:", error);
    }
  };
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

  return (
    <div>
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
          
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
             <form onSubmit={handleSubmit(handleSubmitShipping)}> <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Personal Details</p>
                  <p>Please fill out all the fields.</p>
                  <p className="text-red-500">Please don't refresh the page </p>
                </div>
                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label htmlFor="full_name">Full Name</label>
                      <input
                        type="text"
                        name="full_name"
                        {...register("full_name")}
                        id="full_name"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        defaultValue=""
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="email">Mobile Number</label>
                      <input
                        type="text"
                        name="mobileNumber"
                        {...register("mobileNumber")}
                        id="email"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        defaultValue=""
                        placeholder="9876xxxxxx"
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label htmlFor="address">Address / Street</label>
                      <input
                        type="text"
                        name="address"
                        {...register("address")}
                        id="address"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        defaultValue=""
                        placeholder=""
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="city">City</label>
                      <input
                        type="text"
                        {...register("city")}
                        name="city"
                        id="city"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        defaultValue=""
                        placeholder=""
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="country">Country / region</label>
                      <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <input
                        {...register("country")}
                        name="country"
                          id="country"
                          placeholder="Country"
                          className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                          defaultValue=""
                        />
                        <button
                          tabIndex={-1}
                          className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600"
                        >
                       
                        </button>
                        <button
                          tabIndex={-1}
                          htmlFor="show_more"
                          className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600"
                        >
                         
                        </button>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="state">State / province</label>
                      <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <input
                        {...register("state")}
                        name="state"
                          id="state"
                          placeholder="State"
                          className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                          defaultValue=""
                        />
                        <button
                          tabIndex={-1}
                          className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600"
                        >
                         
                        </button>
                        <button
                          tabIndex={-1}
                          htmlFor="show_more"
                          className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600"
                        >
                          
                        </button>
                      </div>
                    </div>
                    <div className="md:col-span-1">
                      <label htmlFor="zipcode">Zipcode</label>
                      <input
                        type="text"
                        {...register("zipcode")}
                        name="zipcode"
                        id="zipcode"
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder=""
                        defaultValue=""
                      />
                    </div>
                    
                 
                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <button className="bg-green-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
                          Continue
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div></form>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default ShippingDetails;
