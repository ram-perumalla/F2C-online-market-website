import mongoose ,{Schema, Document} from "mongoose";

interface Products extends Document {
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
}

const Products = new mongoose.Schema({
    Farmer: {
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Farmer'
    },
    productname:{
        type:String
    },
    price:{
        type:Number
    },
    quantity:{
        type:String
    },
    description:{
        type:String
    },
    ProductImage:[{
        type:Array
    }],
    category: {
        type: String,
        enum: ['vegetables', 'milk'],
        required: true
      },
      discount:{
        type:Number
      },
      shelflife:{
        type:String
      },
      date:{
        type:Date
      },
      expiredate:{
        type:Date
      },

      storageinstruction:{
        type:String
      },
      howtouse:{
        type:String
      }




   

});

const ProductModel = mongoose.model<Products>('Products',Products);

export default ProductModel

