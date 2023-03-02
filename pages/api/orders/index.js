import dbConnect from '../../../db/mongo';
import Order from '../../../models/Order';

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();
    if (method === "GET") {
        try {
            const order = await Order.find();
            res.status(200).json(order);

        } catch (err) {
            res.status(500).json(err);
        }
    }
    if (method === "POST") {
        try {
            const order = await Order.create(req.body);
            res.status(200).json(order);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    if(method === "DELETE"){
        try{
            await Order.deleteMany({});
            res.status(200).json("Products have been deleted!");
        }catch(err){
            res.status(500).json(err);
        }
    }
}
