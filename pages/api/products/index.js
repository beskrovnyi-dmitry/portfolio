import dbConnect from "../../../db/mongo";
import Product from "../../../models/Product";

export default async function handler(req, res) {
    const {method, cookies} = req;

    const token = cookies.token;

    await dbConnect();
    if(method === "GET"){
        try{
            const product = await Product.find();
            res.status(200).json(product);

        }catch(err){
            res.status(500).json(err);
        }
    }
    if(method === "POST"){
        if(!token || token !== "SWdw4CV||663Z{p3|ZXtP%0k6Ejj;F"){
            return res.status(401).json("Not auth");
        }
        try{
            const product = await Product.create(req.body);
            res.status(200).json(product);

        }catch(err){
            res.status(500).json(err);
        }
    }
  }