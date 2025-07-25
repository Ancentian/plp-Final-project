const searchProduct = async (req, res) => {
    try {
        const query = req.query.q
        // if (!query || !query.query) {
        //     return res.json({
        //         success: false,
        //         message: "No search query provided",
        //         error: true
        //     });
        // }
        const regex = new RegExp(query, 'i', 'g'); // 'i' for case-insensitive search
        const product = await productModel.find({ 
            $or: [
                { productName: regex },
                { category: regex }
            ]
         });

         res.json({
            success: true,
            message: "Search results fetched successfully",
            data: product,
            error: false
        })
        console.log("Search Query:", query);
    } catch (error) {
        res.json({
            success: false,
            message: "Error in searching product",  
            error: error.message || error,
            error: true
        })
    }
}

module.exports = searchProduct;