import mongoose ,{Schema, Document} from "mongoose";

interface customer extends Document{
    firstname:string,
    lastname:string
    email:string,
    password:string,
    confirmpassword:string,
    mobilenumber:number,
    address:string
}

const customer = new mongoose.Schema({
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


let CustomerModel = mongoose.model<customer>("customer",customer);


export default CustomerModel