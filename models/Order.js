import mongoose from 'mongoose';

const OrderSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        required: true
    }
}, {timestamps: true});   
//if model then use it or create it
export default mongoose.models.Order || mongoose.model("Order", OrderSchema); 