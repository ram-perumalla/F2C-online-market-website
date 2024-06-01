import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
    cardnumber: { type: Number },
    expirydate: { type: String },
    expiryYear: { type: String },
    cvv: { type: Number }
});

const paymentSchema = new mongoose.Schema({
    method: {
        type: String,
        enum: ['cash_on_delivery', 'card'],
        required: true
    },
    card: cardSchema
});

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer'
    },
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number,
        delivery: {
            type: String,
            default: "processing"
        }
    }],
    full_name: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    mobileNumber: {
        type: Number
    },
    address: {
        type: String
    },
    zipcode: {
        type: Number
    },
    payment: paymentSchema,
    city: {
        type: String
    },
    country: {
        type: String
    },
    state: {
        type: String
    }
});

const OrderModel = mongoose.model('Order', orderSchema);

export default OrderModel;
