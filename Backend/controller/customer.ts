import { Router } from "express";
import { Request,Response,NextFunction } from "express";
import CustomerModel from "../models/User";

import multer from "multer";
import path from 'path'
import {v4 as uuidv4} from 'uuid'
import ProductModel from "../models/Product";
import CartModel from "../models/Cart";
import mongoose from "mongoose";
import OrderModel from "../models/Order";
const router = Router()





//profile photo

const storage = multer.diskStorage({
    destination:"customer",
    filename :(req:any,file:any ,cb:any)=>{
        const unnifix = uuidv4();
        const fileextension = path.extname(file.originalname)
        cb(null,file.fieldname + '-' + unnifix + fileextension)
    }
})

const fileFilter = (req: any, file: any, cb: any) => {
    const ALLOWED_TYPES = ['image/png', 'image/jpeg']; // Renamed to uppercase for convention
    if (ALLOWED_TYPES.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Image must be in PNG or JPEG format"));
    }
}

const upload = multer({storage:storage,fileFilter:fileFilter});


interface register {
    firstname?:string,
    lastname?:string,
    email?:string,
    password?:string,
    mobilenumber?:number,
    date?:Date,
    confirmpassword?:string,
    address:string

}





//customer register
router.post('/register', upload.single("Avatar"), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { firstname, lastname, email, password, mobilenumber, confirmpassword, address }: register = req.body;
        const user = await CustomerModel.findOne({ email: email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        } else if (password !== confirmpassword) {
            return res.status(400).json({
                success: false,
                message: "Password and confirm password do not match"
            });
        } else {
            const newuser = await CustomerModel.create({
                firstname,
                lastname,
                email,
                password,
                confirmpassword,
                address,
                mobilenumber,
                Avatar: req.file?.filename,
                date: Date.now()
            });

            if (newuser) {
                return res.status(201).json({
                    success: true,
                    message: "Successfully registered"
                });
            } else {
                return res.status(400).json({
                    success: false,
                    message: "Something went wrong, please try again later"
                });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});




//customer login
router.post('/login',async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {email,password} : register = req.body;
        const User = await CustomerModel.findOne({email:email, password:password});
        if(!User){
            return res.status(404).json({
                success:false,
                message:"no user found with this id"
            })
        }else{
            return res.status(200).json({
                success:true,
                message:"login successfull",
                User:User
            })
        }

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
});



//get the profile
router.get('/profile/:id',async(req:Request,res:Response,next:NextFunction)=>{
    const id :string = req.params.id as string;
    try{
     const customer  = await CustomerModel.findById(id);
     if(!customer){
        return res.status(404).json({
            success:false,
            message:"no customer found"
        })
     }else{
        return res.status(200).json({
            success:true,
            customer:customer
        })
     }

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
})


//update the profile 
router.put('/profile/:id',upload.single("Avatar"),async(req:any,res:Response,next:NextFunction)=>{
    const id : string = req.params.id as string;
    try{
        const User = await CustomerModel.findById(id);
        if(!User){
            return res.status(404).json({
                SUCCESS:false,
                message:"no customer found "
            })
        }

        const { firstname, lastname, email, password, mobilenumber, confirmpassword, address }: register = req.body;
        if(password !== confirmpassword){
            return res.status(400).json({
                success:false,
                message:"Password and confirm password do not match"
            })
        }
        const updateProfile = await CustomerModel.findByIdAndUpdate(id,{
            firstname, lastname, email, password, mobilenumber, confirmpassword, address ,
            Avatar:req.file?.filename
        });
        if(updateProfile){
            return res.status(201).json({
                success:true,
                message:"update successfully"
            })
        }

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
})






//section b
router.get('/products', async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id;
    const name: string = req.query.name as string;
    const page: number = req.query.page ? parseInt(req.query.page as string) : 1; // Get page number from query parameter, default to 1
    const limit: number = 10; // Number of items per page
    const skip: number = (page - 1) * limit; // Calculate the number of documents to skip based on the page number

    try {
        // const User = await CustomerModel.findById(id);
        // if (!User) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "No user found"
        //     });
        // }

        let products; // Define products variable outside if-else block

        if (name) {
           //    console.log(name)
            products = await ProductModel.aggregate([
                {
                    $match: {
                        $or: [
                            { productname: { $regex: name, $options: 'i' } }, // Match by product name
                            { category: name.toLowerCase() } // Match by category
                        ]
                    }
                },
                {
                    $skip: skip // Skip documents based on the calculated skip value
                },
                {
                    $limit: limit // Limit the number of documents returned per page
                }
            ]);
          //  console.log(products)
        } else {
            products = await ProductModel.aggregate([
                {
                    $skip: skip
                },
                {
                    $limit: limit
                }
            ]);
        }

        return res.status(200).json({
            success: true,
            data: products // Return paginated products
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});





router.get('/product/:userid/:productid',async(req:Request,res:Response,next:NextFunction)=>{
    const userid : string = req.params.userid as string;
    const productid : string = req.params.productid as string
    try{
    const customer = await CustomerModel.findById(userid )
    if(!customer){
        return res.status(404).json({
            success:false,
            messagte:"no customer found with this id"
        })
    }
    const product = await ProductModel.findById(productid);
    if(!product){
        return res.status(404).json({
            success:false,
            messagte:"no product found with this id"
        })
    }else{
        return res.status(200).json({
            success:true,
            product:product
        })
    }

    
}catch(error){
    console.log(error);
    return res.status(500).json({
        success:false,
        message:"internal server error"
    })
}
})








//add to cart
router.post('/cart/:userid/:productid',async(req:Request,res:Response,next:NextFunction)=>{
    const userid : string = req.params.userid as string;
    const productid : string = req.params.productid as string
    try{
        const customer = await CustomerModel.findById(userid )
        if(!customer){
            return res.status(404).json({
                success:false,
                messagte:"no customer found with this id"
            })
        }
        const product = await ProductModel.findById(productid);
        if(!product){
            return res.status(404).json({
                success:false,
                messagte:"no product found with this id"
            })
        }
        const exitcart = await CartModel.findOne({user:userid,product:productid})
        console.log(exitcart)
        if(exitcart){
            return res.status(400).json({
                success:false,
                message:"product already in cart"
            })
        }else{
            const NewCart = await CartModel.create({
                user:userid,
                product:productid,
                date:Date.now()
                
            })

            if(NewCart){
                return res.status(201).json({
                    success:true,
                    message:"Product Added to cart"
                })
            }
        }

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
});



//get the cart products
router.get('/cart/:userid',async(req:Request,res:Response,next:NextFunction)=>{
    const userid : string = req.params.userid as string;
    try{
        const Customer  = await CustomerModel.findById(userid);
        if(!Customer){
            return res.status(404).json({
                success:false,
                message:"no Customer found with this id"
            })
        }
        const products = await CartModel.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(userid) // Match the 'user' field with the provided ObjectId value
                }
            },
            {
                $lookup: {
                    from: ProductModel.collection.name, // Use collection name instead of collection
                    localField: 'product',
                    foreignField: '_id',
                    as: "products"
                }
            }
        ]);
        console.log(products,"products");
        if(products.length === 0){
            return res.status(404).json({
                success:false,
                message:"no products found"
            })
        }else{
            return res.status(200).json({
                success:true,
                products:products
            })
        }

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
})




//remove from the cart
router.delete('/cart/:userid/:productid',async(req:Request,res:Response,next:NextFunction)=>{
    const userid : string = req.params.userid as string;
    const productid : string = req.params.productid as string;
    try{
        const Product = await CartModel.findOne({user:userid,product:productid});
        if(!Product){
            return res.status(404).json({
                success:false,
                message:"NO Product Found In The Cart"
            })
        }
        const deleteproduct = await CartModel.findByIdAndDelete(Product._id);
        if(deleteproduct){
            return res.status(200).json({
                success:true,
                message:"Product Removed From Cart"
            })
        }

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
})












// send request to farmer
router.post('/order/:userid',async(req:Request,res:Response,next:NextFunction)=>{
    const userid : string = req.params.userid as string;
   // const productid : string = req.params.productid as string;
    try{
        const customer = await CustomerModel.findById(userid)
        if(!customer){
            return res.status(404).json({
                success:false,
                messagte:"no customer found with this id"
            })
        }
        const products = await CartModel.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(userid) // Match the 'user' field with the provided ObjectId value
                }
            },
            {
                $lookup: {
                    from: ProductModel.collection.name, // Use collection name instead of collection
                    localField: 'product',
                    foreignField: '_id',
                    as: "products"
                }
            }
        ]);
        const priductid = products.map((item:any)=>item._id)
        // const product = await ProductModel.findById(productid);
        // if(!product){
        //     return res.status(404).json({
        //         success:false,
        //         messagte:"no product found with this id"
        //     })
        // }


    //full_name, mobileNumber,address,city, country,state,zipcode
       const {full_name,quantity,mobileNumber,address,zipcode,city,country,state} = req.body
       const neworder = await OrderModel.create({
        user:userid,
        productid:priductid,
        quantity:quantity,
        full_name,
        mobileNumber,
        address,
        zipcode,
        city,
        country,
        state,
        date:Date.now(),
       
       });
       if(neworder){
        return res.status(201).json({
            success:true,
            message:"Order sent to Farmer"
        })
       }
       

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
});



//order the products
router.post('/orders/:userid', async (req, res) => {
    const userid = req.params.userid;
    try {
        const customer = await CustomerModel.findById(userid);
        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "No customer found with this id"
            });
        }

        const { products, full_name, mobileNumber, address, zipcode, city, country, state, payment } = req.body;

        const orderDetails = products.map((product:any) => ({
            product: product.productid,
            quantity: product.quantity
        }));

        const newOrderData = {
            user: userid,
            products: orderDetails,
            full_name,
            mobileNumber,
            address,
            zipcode,
            city,
            country,
            state,
            date: Date.now(),
            payment: payment // Include the provided payment data
        };

        const newOrder = await OrderModel.create(newOrderData);

        if (newOrder) {
            await CartModel.deleteMany({ user: userid });

            return res.status(201).json({
                success: true,
                message: "Order sent to Farmer"
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});




//new onr
// router.post('/orders/:userid', async (req: Request, res: Response, next: NextFunction) => {
//     const userid: string = req.params.userid as string;
//     try {
//         const customer = await CustomerModel.findById(userid);
//         if (!customer) {
//             return res.status(404).json({
//                 success: false,
//                 message: "No customer found with this id"
//             });
//         }

//         const { products, full_name, mobileNumber, address, zipcode, city, country, state, payment } = req.body;

//         // Create orderDetails array with product ID and quantity for each product
//         const orderDetails = products.map((product: any) => ({
//             product: product.productid,
//             quantity: product.quantity
//         }));

//         // Define newOrderData object including payment property
//         let newOrderData: any = {
//             user: userid,
//             products: orderDetails,
//             full_name,
//             mobileNumber,
//             address,
//             zipcode,
//             city,
//             country,
//             state,
//             date: Date.now(),
//             payment: undefined // Initialize payment property
//         };

//         // Include payment details only if payment method is 'card'
//         if (payment.method === 'card') {
//             newOrderData.payment = {
//                 method: 'card',
//                 card: {
//                     cardnumber: payment.cardnumber,
//                     expire: payment.expire,
//                     cvv: payment.cvv
//                 }
//             };
//         } else {
//             // If payment method is not 'card', include only the method
//             newOrderData.payment = {
//                 method: payment.method
//             };
//         }

//         const newOrder = await OrderModel.create(newOrderData);

//         if (newOrder) {
//             // Clear the cart after placing the order
//             await CartModel.deleteMany({ user: userid });

//             return res.status(201).json({
//                 success: true,
//                 message: "Order sent to Farmer"
//             });
//         }

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             success: false,
//             message: "Internal server error"
//         });
//     }
// });





//get the success request
router.get('/orders/:userid', async (req: Request, res: Response, next: NextFunction) => {
    const userid: string = req.params.userid as string;
    try {
        const user = await CustomerModel.findById(userid);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No customer found with this id"
            });
        } else {
            const orders = await OrderModel.aggregate([
                {
                    $match: {
                        user: new mongoose.Types.ObjectId(userid),
                        
                    }
                },
                {
                    $lookup: {
                        from: ProductModel.collection.name,
                        localField: "products.product",
                        foreignField: "_id",
                        as: "productdetails"
                    }
                },
                {
                    $project: {
                        "_id": 1,
                        "full_name": 1,
                        "date": 1,
                        "status": 1,
                        "mobileNumber": 1,
                        "zipcode": 1,
                        "city": 1,
                        "country": 1,
                        "state": 1,
                        "payment":1,
                        "productdetails":1,
                        "products.quantity":1
                    }
                }
              
            ]);

            if (orders.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No orders found"
                });
            } else {
                return res.status(200).json({
                    success: true,
                    orders: orders
                });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});





//payment for the Order
router.post('/paymentorder/:userid/:orderid', async (req: Request, res: Response, next: NextFunction) => {
    const userid: string = req.params.userid;
    const orderid: string = req.params.orderid;

    try {
        const user = await CustomerModel.findById(userid);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No Customer found with this id"
            });
        }

        const order = await OrderModel.findById(orderid);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "No order found"
            });
        }

        const Payment = req.body.payment;
        let updatePayment;

        if (Payment === "card") {
            const { cardholdername, cardnumber, expirydate, expiryYear, cvv } = req.body;
            updatePayment = await OrderModel.findByIdAndUpdate(orderid, {
                payment: {
                    method: "card",
                    card: {
                        cardholdername,
                        cardnumber,
                        expirydate,
                        expiryYear,
                        cvv
                    }
                }
            });
        } else if (Payment === "cash_on_delivery") {
            updatePayment = await OrderModel.findByIdAndUpdate(orderid, {
                payment:{
                    method: "cash_on_delivery"
                }
            });
            console.log(Payment)
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid payment method"
            });
        }

        if (updatePayment) {
            return res.status(201).json({
                success: true,
                message: "Payment method updated successfully",
                updatePayment
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});







//all user get the product
router.get('/allproducts', async (req: Request, res: Response, next: NextFunction) => {

    const name: string = req.query.name as string;
    const page: number = req.query.page ? parseInt(req.query.page as string) : 1; // Get page number from query parameter, default to 1
    const limit: number = 10; // Number of items per page
    const skip: number = (page - 1) * limit; // Calculate the number of documents to skip based on the page number

    try {

        let products; // Define products variable outside if-else block

        if (name) {
            console.log(name)
            products = await ProductModel.aggregate([
                {
                    $match: {
                        $or: [
                            { productname: { $regex: name, $options: 'i' } }, // Match by product name
                            { category: name.toLowerCase() } // Match by category
                        ]
                    }
                },
                {
                    $skip: skip // Skip documents based on the calculated skip value
                },
                {
                    $limit: limit // Limit the number of documents returned per page
                }
            ]);
            console.log(products)
        } else {
            products = await ProductModel.aggregate([
                {
                    $skip: skip
                },
                {
                    $limit: limit
                }
            ]);
        }

        return res.status(200).json({
            success: true,
            data: products // Return paginated products
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});






export  default router
