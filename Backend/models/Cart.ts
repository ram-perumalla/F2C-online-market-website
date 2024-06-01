import mongoose from "mongoose";

const Cart = new mongoose.Schema({
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'customer'
    },
    product:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Products'
    },
    date:{
      type: Date
    }
})


let CartModel = mongoose.model('Cart',Cart)


export default CartModel