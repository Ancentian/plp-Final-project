const productModel = require("../../models/productModel")
const uploadProductPermission = require("../../helpers/permission")

async function updateProductController (req, res) {
    try{
        const sessionUserId = req.userId
        
        if(!uploadProductPermission(sessionUserId)){
            throw new Error("Permission denied")
        }

        const {_id, ...resBody} = req.body

        const updateProduct = await productModel.findByIdAndUpdate(_id, resBody)

        res.status(201).json({
            message : "Product update successfully",
            error : false,
            success : true,
            data : updateProduct
        })

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = updateProductController