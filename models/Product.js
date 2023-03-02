import mongoose from 'mongoose';

const ProductSchema =  new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 50
    },
    prices: {
        type: [Number],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    extraOptions: {
        type: [{
            text:  {type: String, required: true}, 
            price: {type: Number, required: true}
        }],
    }
}, {timestamps: true});   
//if model then use it or create it
export default mongoose.models.Product || mongoose.model("Product", ProductSchema);