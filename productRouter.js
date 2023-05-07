import express from "express"
import expressAsyncHandler from "express-async-handler";
import data from "./data.js";
import Product from "./productModel.js";

const productRouter = express.Router();


productRouter.get("/",expressAsyncHandler(async(req,res)=>{
    const products= await Product.find({})
    res.send(products)
}))


productRouter.get("/seed",expressAsyncHandler(async(req,res)=>{
   // await Product.remove({})
    const createdProduct = await Product.insertMany(data.product)
    res.send({createdProduct})
}))

productRouter.get("/:id",expressAsyncHandler(async(req,res)=>{
    const product=await Product.findById(req.params.id)
    if(product){
        res.send(product)
    }else{
        res.status(404).send({message: "product not found"})
    }
}))

productRouter.delete("/:id",expressAsyncHandler(async(req,res)=>{
        var query={_id:req.params.id};
        const product=await Product.deleteOne(query)
        if(product){
            res.send(product)
        }else{
            res.status(404).send({message:"product not found"})
        }

}))

productRouter.put("/:id",expressAsyncHandler(async(req,res)=>{

    const product=await Product.findById(req.params.id)
    if(product){
            product.name=req.body.name || product.name       
            product.category=req.body.category || product.category
            product.image=req.body.image || product.image
            product.price=req.body.price || product.price
            product.CountInStock=req.body.count || product.CountInStock
            product.brand=req.body.brand || product.brand
            product.rating=req.body.rating || product.rating
            product.numReviews=req.body.numReviews || product.numReviews
            product.description=req.body.description || product.description
        
            const updatedProduct=await product.save()

            res.send(
                {
                    _id:updatedProduct._id,
                    name:updatedProduct.name,
                    category:updatedProduct.category,
                    image:updatedProduct.image,
                    price:updatedProduct.price,
                    CountInStock:updatedProduct.CountInStock,
                    brand:updatedProduct.brand,
                    rating:updatedProduct.rating,
                    numReviews:updatedProduct.numReviews,
                    description:updatedProduct.description,


                }
            )
    }else{
        res.status(404).send({message:"Product Not Found"})
    }

}))


export default productRouter
