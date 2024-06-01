import mongoose ,{Schema, Document} from "mongoose";

interface Farmer extends Document{
    firstname:string,
    lastname:string
    email:string,
    password:string,
    confirmpassword:string,
    mobilenumber:number,
    address:string
}

const Farmer = new mongoose.Schema({
    firstname:{
        type:String
    },
    lastname:{
       type:String
    },
    email:{
        type:String
    },
    password:{
        type:String,
    },
    mobilenumber:{
        type:Number
    },
    confirmpassword:{
        type:String
    },
    address:{
        type:String
    },
    Avatar:{
     type:String
    },
    date:{
        type:Date
    }
});


let FarmerModel = mongoose.model<Farmer>("Farmer",Farmer);


export default FarmerModel