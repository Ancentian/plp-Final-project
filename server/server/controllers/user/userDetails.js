const userModel = require("../../models/userModel")

async function userDetailsController(req, res) {
    try {
        const user = await userModel.findById(req.userId)

        res.status(200).json({
            data : user,
            error: false,
            success: true,
            message: "User details fetched successfully"
        })
    } catch (error) {
        res.status(400).json({
            error : error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = userDetailsController