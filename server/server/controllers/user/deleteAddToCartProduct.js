const cartProduct = require('../../models/cartProduct');

const deleteAddToCartProduct = async (req, res) => {
    try {
        const currentUser = req.userId;
        const addToCartProductId = req.body._id;

        const deleteProduct = await cartProduct.deleteOne({_id: addToCartProductId})

        res.json({
            message: "Product deleted successfully",
            error: false,
            data: deleteProduct,
            success: true,
        })
    } catch (error) {
        res.json({
            message : error?.message || "An error occurred while deleting the product",
            error : true,
            success : false
        })
    }
}

module.exports = deleteAddToCartProduct;