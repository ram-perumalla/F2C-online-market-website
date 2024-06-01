import { Router } from "express";
import { Request,Response,NextFunction } from "express";
import FarmerModel from "../models/Farmer";
import multer from "multer";
import path from 'path';
import {v4 as uuidv4} from 'uuid'
import ProductModel from "../models/Product";
import { Date } from "mongoose";
import OrderModel from "../models/Order";

const router = Router();


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






//profile photo

const storage = multer.diskStorage({
    destination:"Farmer",
    filename :(req:any,file:any ,cb:any)=>{
        const unnifix = uuidv4();
        const fileextension = path.extname(file.originalname)
        cb(null,file.fieldname + '-' + unnifix + fileextension)
    }
})

const fileFilters = (req: any, file: any, cb: any) => {
    const ALLOWED_TYPES = ['image/png', 'image/jpeg']; // Renamed to uppercase for convention
    if (ALLOWED_TYPES.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Image must be in PNG or JPEG format"));
    }
}

const upload =  multer({ storage: storage, fileFilter: fileFilters });






//farmer register
router.post('/register', upload.single("Avatar"), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { firstname, lastname, email, password, mobilenumber, confirmpassword, address }: register = req.body;
        const user = await FarmerModel.findOne({ email: email });
        
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
            const newuser = await FarmerModel.create({
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




//Farmer login
router.post('/login',async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {email,password} : register = req.body;
        const User = await FarmerModel.findOne({email:email, password:password});
        if(!User){
            return res.status(404).json({
                success:false,
                message:"invalid credentials"
            })
        }else{
            return res.status(200).json({
                success:true,
                message:"login successfull",
                Farmer:User
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


//farmer get the profile
router.get('/profile/:id',async(req:Request,res:Response,next:NextFunction)=>{
    const id :string = req.params.id as string;
    try{
        const Farmer = await FarmerModel.findById(id)
        if(!Farmer){
            return res.status(404).json({
                success:false,
                message:"no Farmer found with is id"
            })
        }else{
            return res.status(200).json({
                success:true,
                Farmer:Farmer
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


router.put('/profile/:id', upload.single("Avatar"), async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id;
    try {
        // Find the Farmer by ID
        const farmer = await FarmerModel.findById(id);
        if (!farmer) {
            return res.status(404).json({
                success: false,
                message: "No Farmer found with this id"
            });
        }

        // Extract fields from request body
        const { firstname, lastname, email, mobilenumber, address,password,confirmpassword }: register = req.body; 
        
        // Prepare the fields for updating
        const profileUpdate: any = {
            firstname,
            lastname,
            email,
            mobilenumber,
            address,
            password,
            confirmpassword
        };

        // If Avatar file is uploaded, update the Avatar field
        if (req.file) {
            profileUpdate.Avatar = req.file.filename;
        }

        // Update the Farmer's profile
        const updatedFarmer = await FarmerModel.findByIdAndUpdate(id, profileUpdate, { new: true });

        // Check if update was successful
        if (updatedFarmer) {
            return res.status(200).json({
                success: true,
                message: "Profile updated successfully",
                data: updatedFarmer // Return updated Farmer object
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Failed to update profile"
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







//add products


const storages = multer.diskStorage({
    destination: "products",
    filename: (req: any, file: any, cb: any) => {
        const unnifix = uuidv4();
        const fileextension = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + unnifix + fileextension); // Corrected the callback arguments
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

const productUpload = multer({ storage: storages, fileFilter: fileFilter });

interface products {
    productname?: string,
    price?: number,
    quantity?: string, // Changed to lowercase 'number'
    description?: string,
    discount?:number,
    category?:string,
    shelflife?:string,
    date?:Date,
    expiredate?:Date,
    storageinstruction?:string,
    howtouse?:string,



    // Add other fields with data types if needed
}

router.post('/product/:farmerid', productUpload.array("ProductImage"), async (req: any, res: Response, next: NextFunction) => {
    const farmerId: string = req.params.farmerid as string;
    try {
        if(!req.files || req.files.length===0){
            return res.status(400).json({
                success:false,
                message:"image is required"
               })
        }

        const images : string[] = req.files.map((item:any)=>item.filename)
        const { productname, price, discount, category, shelflife, date, expiredate, storageinstruction, howtouse, quantity, description }: products = req.body;
        

        const newProduct = await ProductModel.create({
            Farmer: farmerId,
            productname,
            price,
            quantity,
            description,
            discount,
            category, 
            shelflife, 
            date, 
            expiredate, 
            storageinstruction, 
            howtouse,
            ProductImage:images
        });

        if (newProduct) {
            return res.status(201).json({
                success: true,
                message: "Product Added Successfully"
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});



//get the product
router.get('/products/:farmerid',async(req:Request,res:Response,next:NextFunction)=>{
    const farmerid : string = req.params.farmerid as string;
    try{
        const Farmer = await FarmerModel.findById(farmerid);
        if(!Farmer){
            return res.status(404).json({
                success:false,
                message:"no Farmer Found"
            })
        }else{
            const Product = await ProductModel.find({Farmer:farmerid});
            if(Product.length === 0){
                return res.status(404).json({
                    success:false,
                    message:"no products found"
                })
            }else{
                return res.status(200).json({
                    success:true,
                    Product
                })
            }
        }

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"internal server errror"
        })
    }
})
//get the product detils

router.get('/product/:farmerid/:productid',async(req:Request,res:Response,next:NextFunction)=>{
    const farmerid : string = req.params.id as string;
    const productid : string = req.params.id as string;
    try{
        const Farmer = await FarmerModel.findById(farmerid);
        if(!Farmer){
            return res.status(404).json({
                success:false,
                message:"no Farmer Found"
            })}
            const product = await ProductModel.findById(productid)
            if(!product){
                return res.status(404).json({
                    success:false,
                    message:"no Farmer Found"
                })}else{
                    return res.status(200).json({
                        success:true,
                        product
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

//update 
router.put('/product/:productid',productUpload.array("ProductImage"),async(req:any,res:Response,next:NextFunction)=>{
    const productid : string = req.params.productid as string;
    try{
        const product = await ProductModel.findById(productid);
        if(!product){
            return res.status(404).json({
                success:false,
                message:"no product found"
            })
        }
        const { productname, price, discount, category, shelflife, date, expiredate, storageinstruction, howtouse, quantity, description }: products = req.body;
        const images: string[] = req.files.map((file: any) => file.filename); // Extracting filenames from uploaded images

        const updateproduct = await ProductModel.findByIdAndUpdate(productid,{
            productname,
            price,
            quantity,
            description,
            images,
            discount,
            category, 
            shelflife, 
            date, 
            expiredate, 
            storageinstruction, 
            howtouse})
        if (updateproduct) {
            return res.status(201).json({
                success: true,
                message: "Product Update Successfully",
                updateproduct
            });
        }

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
})

//delete product
router.delete('/product/:productid',async(req:any,res:Response,next:NextFunction)=>{
    const productid : string = req.params.productid as string;
    try{
        const product = await ProductModel.findById(productid);
        if(!product){
            return res.status(404).json({
                success:false,
                message:"no product found"
            })
        }else{
            await ProductModel.findByIdAndDelete(productid);
            return  res.status(200).json({
                success:true,
                message:"product deleted"
            })
        }

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
});




//view order change status
router.get('/orders/:farmerid', async (req: Request, res: Response, next: NextFunction) => {
    const farmerid: string = req.params.farmerid;

    try {
        const farmer = await FarmerModel.findById(farmerid);
        if (!farmer) {
            return res.status(404).json({
                success: false,
                message: "No farmer found"
            });
        }

        const products = await ProductModel.find({ Farmer: farmerid });
        const productids = products.map((item: any) => item._id);

        const orders = await OrderModel.aggregate([
            {
                $match: {
                    'products.product': { $in: productids } 
                }
            },
            {
                $unwind: '$products' // Unwind the products array
            },
            {
                $lookup: {
                    from: ProductModel.collection.name,
                    localField: 'products.product',
                    foreignField: '_id',
                    as: 'ordered_products'
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
                    "orderedProduct": {
                        $mergeObjects: [
                            { $arrayElemAt: ["$ordered_products", 0] },
                            {
                                orderquantity: "$products.quantity",
                                status:"$products.delivery",
                                payment:"$products.payment",
                                orderId: "$_id"
                            }
                        ]
                    }
                }
            }
        ]);

   
        if (orders.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No orders found for this farmer"
            });
        }

        return res.status(200).json({
            success: true,
            data: orders
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});



//accept the status



// router.put('/orders/:farmerid/:productid', async (req: Request, res: Response, next: NextFunction) => {
//     const farmerid: string = req.params.farmerid as string;
//     const productid: string = req.params.productid as string;
//     try {
//         // Find the farmer
//         const farmer = await FarmerModel.findById(farmerid);
//         if (!farmer) {
//             return res.status(404).json({
//                 success: false,
//                 message: "No farmer found"
//             });
//         }

//         // Find the order associated with the provided product ID
//         const order = await OrderModel.findOne({ "products.product": productid });
//         if (!order) {
//             return res.status(404).json({
//                 success: false,
//                 message: "No order found with this product ID"
//             });
//         }

//         // Update the status of the order
//         const { status } = req.body;
//         console.log(status);
//         // Update the status of the product within the order
//         order.products.forEach((product: any) => {
//             if (product.product === productid) {
//                 product.delivery = status;
//                 console.log(product.delivery)
//             }
//         });
      
//         // Save the updated order
//         const updatedOrder = await order.save();
//         console.log(updatedOrder)
//         if (updatedOrder) {
//             return res.status(200).json({
//                 success: true,
//                 message: "Order status updated successfully",
//                 updatedOrder
//             });
//         } else {
//             return res.status(500).json({
//                 success: false,
//                 message: "Failed to update order status"
//             });
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success: false,
//             message: "Internal server error"
//         });
//     }
// });



router.put('/orders/:farmerid/:productid', async (req: Request, res: Response, next: NextFunction) => {
    const farmerid: string = req.params.farmerid as string;
    const productid: string = req.params.productid as string;
    try {
        // Find the farmer
        const farmer = await FarmerModel.findById(farmerid);
        if (!farmer) {
            return res.status(404).json({
                success: false,
                message: "No farmer found"
            });
        }

        // Find the order associated with the provided product ID
        let order = await OrderModel.findOne({ "products.product": productid });
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "No order found with this product ID"
            });
        }

   // console.log(order)
        const {  delivery } = req.body;
 
     
        order.products.forEach((product: any) => {
            if (product.product.toString() === productid) {
                product.delivery = req.body.delivery; // Update the delivery status
            }
        });

        

        // Save the updated order
        const updatedOrder = await order.save();

        if (updatedOrder) {
            return res.status(200).json({
                success: true,
                message: "Order status updated successfully",
                updatedOrder
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "Failed to update order status"
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});





export default router