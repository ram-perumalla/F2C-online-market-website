import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AxiosAPI, { url } from "../AxiosAPI";
import { toast } from "react-toastify";
import ShippingDetails from "./ShippingDetails";
import { useSearch } from "../home/SearchContext";

const ViewCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const {productQuantities, setProductQuantities, totalAmount, setTotalAmount} = useSearch()
  
  const navigateTo = useNavigate();
  const { user } = JSON.parse(sessionStorage.getItem("login"));
const [showShipping , setShowShipping]=useState(false)
  const getCart = async () => {
    try {
      const res = await AxiosAPI.get(`customer/cart/${user._id}`);
      console.log(res);
      setCartItems(res.data.products);
      // Initialize quantities for each product
      const initialQuantities = res.data.products.reduce((acc, curr) => {
        acc[curr.product] = 1; // Set initial quantity to 1 for each product
        return acc;
      }, {});
      setProductQuantities(initialQuantities);
    } catch (error) {
      console.log(error);
    }
  };
const deleteCart=async(id)=>{
  try {
    const res =await AxiosAPI.delete(`customer/cart/${user._id}/${id}`);
    console.log(res);
    toast.success(res.data?.message);
    getCart();
  } catch (error) {
    console.log(error);
  }
}
  const handleQuantityChange = (productId, quantity) => {
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };

  const handleIncrement = (productId) => {
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: prevQuantities[productId] + 1,
    }));
  };

  const handleDecrement = (productId) => {
    if (productQuantities[productId] > 1) {
      setProductQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: prevQuantities[productId] - 1,
      }));
    }
  };

  useEffect(() => {
    getCart();
    
  }, []);
  useEffect(() => {
    // Calculate total amount whenever cart items or quantities change
    const total = cartItems.reduce((acc, item) => {
      return acc + item.products[0].discount * productQuantities[item.product];
    }, 0);
    setTotalAmount(total);
  }, [cartItems, productQuantities]);
// console.log(productQuantities);
Object.entries(productQuantities).map(([productId, quantity]) => {
  // Do something with productId and quantity
  console.log(`Product ID: ${productId}, Quantity: ${quantity}`);
});
  return (
    <div>
     { !showShipping?<section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <header className="text-center">
              <h1 className="text-xl font-bold text-gray-900 sm:text-3xl flex justify-between">
                Your Cart
                 <div>
      <button class="relative bg-gray-500 text-white p-3 rounded-lg text-sm uppercase font-semibold tracking-tight overflow-visible">
      <svg xmlns="http://www.w3.org/2000/svg" fill="white" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/></svg>

        <div class="absolute -top-3 -right-3 px-2.5 py-0.5 bg-yellow-500 rounded-full text-xs">{cartItems?.length}</div>
      </button>
    </div>
              </h1>
            </header>

            <div className="mt-8">
              <ul className="space-y-4">
                {cartItems &&
                  cartItems.map((items) => (
                    <li className="flex items-center gap-4">
                      <img
                         src={`${url}products/${items.products[0].ProductImage[0]}`}
                        alt=""
                        className="size-16 rounded object-cover"
                      />

                      <div>
                        <h3 className="text-sm text-gray-900">{items.products[0].productname}</h3>

                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                          <div>
                            <dt className="inline">Shelf:</dt>
                            <dd className="inline">{items.products[0].shelflife}</dd>
                          </div>

                          {/* <div>
                  <dt className="inline">Color:</dt>
                  <dd className="inline">White</dd>
                </div> */}
                        </dl>
                      </div>
                      <div>
                        <h3 className="text-sm text-gray-900">Price</h3>

                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                          <div>
                            <dt className="inline">{items.products[0].discount} </dt>
                            <dd className="inline">Rupees</dd>
                          </div>

                          {/* <div>
                  <dt className="inline">Color:</dt>
                  <dd className="inline">White</dd>
                </div> */}
                        </dl>
                      </div>
                     
                      <div className="flex flex-1 items-center justify-end gap-2">
                        <button
                          className="text-white bg-red-500 rounded px-3 p-1 transition hover:text-teal-600 "
                          onClick={() => handleDecrement(items.product)}
                        >
                          <span className="sr-only">Remove item</span>-
                        </button>
                        <form>
                          <label htmlFor="Line3Qty" className="sr-only">
                            {" "}
                            Quantity{" "}
                          </label>

                          <input
                            type="number"
                            min="1"
                            value={productQuantities[items.product]}
                            onChange={(e) =>
                              handleQuantityChange(items.product, parseInt(e.target.value))
                            }
                            id="Line3Qty"
                            className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                          />
                        </form>

                        <button
                          className="text-white bg-teal-500 rounded px-3 p-1 transition hover:text-red-600 "
                          onClick={() => handleIncrement(items.product)}
                        >
                          <span className="sr-only">Add item</span>+
                        
                        </button>
                        <button onClick={()=>deleteCart(items.products[0]._id)}>  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg></button>
                      </div>
                    </li>
                  ))}

                           </ul>

              <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                <div className="w-screen max-w-lg space-y-4">
                  <dl className="space-y-0.5 text-sm text-gray-700">
                 
                    <div className="flex justify-between !text-base font-medium">
                      <dt>Total</dt>
                     <dd>₹ {totalAmount}</dd>
                    </div>
                  </dl>

                  <div className="flex justify-end">
                   
                  </div>

                  <div className="flex justify-end">
                    <Link
                   to={`/shipping`}
                      className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                    >
                     Proceed
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>: <ShippingDetails productQuantities={productQuantities} totalAmount={totalAmount}/>}
     
    </div>
  );
};

export default ViewCart;
