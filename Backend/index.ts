import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from 'cors';
import farmer from  './controller/Farmer'
import customer from './controller/customer'

const PORT = 3500




const app = express();
app.use(express.json())
app.use(cors())
app.use('/Farmer', express.static('Farmer'))
app.use('/Products',express.static('products'))
app.use('/customer',express.static('customer'))





mongoose.connect("mongodb://localhost:27017/customer").then(()=>{
    console.log("mongodb is connected")
    app.listen(PORT,()=>{
        console.log(`server is running the ${PORT}`)
    })
})


app.use('/farmer',farmer);
app.use('/customer',customer)