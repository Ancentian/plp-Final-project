const cartProduct = require('../../models/cartProduct');

const updateAddToCartProduct = async (req, res) => {
    try {
        const currentUser = req.userId;
        const addToCartProductId = req?.body?._id;
        const qty = req.body.quantity;

        const updateProduct = await cartProduct.updateOne({_id: addToCartProductId},{
            ...(qty && { quantity: qty }), 
        })
        console.log("Update Product", updateProduct)
        res.json({
            message: "Product updated successfully",
            data: updateProduct,
            error: false,
            success: true,
        })
    } catch (error) {
        res.json({
            message : error?.message || "An error occurred while updating the product",
            error : true,
            success : false
        })
    }
}

module.exports = updateAddToCartProduct;