const productModel = require("../../models/productModel")

const getProductDetails = async(req,res) => {
    try{
        const {productId} = req.body
        const product = await productModel.findById(productId)

        res.json({
            message : "Product Details",
            error : false,
            success : true,
            data : product
        })
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = getProductDetails