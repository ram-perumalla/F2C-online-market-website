import React, { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import AxiosAPI, { url } from "../AxiosAPI";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast } from "react-toastify";
const ViewProductdetails = () => {
  const { productId } = useParams();
  // console.log(productId);
  // const product= JSON.parse(productId)
  //   const getProductById=async()=>{
  //     try {
  //       const res= await AxiosAPI.get(``);

  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   useEffect(()=>{
  // getProductById()
  //   }, [])
  const location = useLocation();
  console.log(location.state);
  const product = location.state;

  const settings = {
    dots: true,
    infinite:  product?.ProductImage?.length <= 1 ? false : true,
    
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
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
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="grid gap-12 row-gap-8 lg:grid-cols-2">
          <Slider {...settings}>
           {product?.ProductImage.map((item)=>   <div>
            <img
                className="object-cover w-full h-56 rounded shadow-lg sm:h-96"
                src={`${url}products/${item}`}
              />
            </div>)}
           
          </Slider>
          <div className="flex flex-col justify-center">
            <div className="max-w-xl mb-6">
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                {product?.productname}
                <br className="hidden md:block" />

                <span className="inline-block text-deep-purple-accent-400"></span>
              </h2>
              <p className="text-base text-gray-700 md:text-lg">
                {product?.description}
              </p>
            </div>

            <div className="grid gap-8 row-gap-8 sm:grid-cols-2">
              <div>
                <h6 className="mb-2 font-semibold leading-5">Price</h6>
                <p className="text-lg text-gray-900 line-through">
                  ₹ {product?.price}
                </p>
                <p className="text-lg text-green-900 ">₹ {product?.discount}</p>
              </div>
              <div>
                <h6 className="mb-2 font-semibold leading-5">How To use</h6>
                <p className="text-sm text-gray-900">{product?.howtouse}</p>
              </div>
              <div>
                <h6 className="mb-2 font-semibold leading-5">
                  Storage Instruction
                </h6>
                <p className="text-sm text-gray-900">
                  {product?.storageinstruction}
                </p>
              </div>
              <div>
                <h6 className="mb-2 font-semibold leading-5">
                  Available Quantity
                </h6>
                <p className="text-sm text-gray-900">{product?.quantity}</p>
              </div>
              <div>
                <h6 className="mb-2 font-semibold leading-5">Shelf Life</h6>
                <p className="text-sm text-gray-900">{product?.shelflife}</p>
              </div>
              <div>
                <h6 className="mb-2 font-semibold leading-5">Expiry Date</h6>
                <p className="text-sm text-gray-900">{product?.expiredate}</p>
              </div>
              <div>
                <h6 className="mb-2 font-semibold leading-5">Category</h6>
                <p className="text-sm text-gray-900">{product?.category}</p>
              </div>
              <div>
                <h6 className="mb-2 font-semibold leading-5"></h6>
                <p className="text-sm text-gray-900">
                  <button className="bg-teal-500 rounded p-2" onClick={()=>addtoCartFuction(product?._id)}>
                    Add to cart
                  </button>
                  <Link className="bg-yellow-500 ml-2 rounded p-2" to={`/cart`} >
                    View Cart
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProductdetails;
