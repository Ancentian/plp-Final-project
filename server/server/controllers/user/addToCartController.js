const addToCartModel = require("../../models/cartProduct")

const addToCartController =  async(req, res) =>{
    try{
        const { productId } = req?.body
        const currentUser = req.userId

        const isProductExist = await addToCartModel.findOne({productId})

        if(isProductExist){
            return res.json({
                message : "Product already exist in cart",
                error : true,
                success : false
            })
        }

        const payload = {
            userId : currentUser,
            productId: productId,
            quantity : 1
        }

        const newAddToCart = new addToCartModel(payload)
        const saveAddToCart = await newAddToCart.save()

        res.json({
            data: saveAddToCart,
            message: "Product Added To Cart",
            success: true,
            error: false
        })
    }catch(err){
        res.status(400).json({
            message : err?.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = addToCartController