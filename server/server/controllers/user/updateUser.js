const userModel = require('../../models/userModel')

async function updateUser (req, res) {
    try {
        const sessionUser = req.userId

        const {userId, email, name, role} =req.body

        const payload = {
            ...(email && {email : email}),
            ...(name && {name : name}),
            ...(role && {role : role})
        }

        const user = await userModel.findById(sessionUser)
        // if (user.role == "ADMIN") {
        //     return res.status(400).json({
        //         message: "You are not authorized to perform this action",
        //         error: true,
        //         success: false
        //     })
        // }
        console.log("user Role", user.role)
        

        const updateUser = await userModel.findByIdAndUpdate(userId, payload)
        res.json({
            data: updateUser,
            message: "User Updated Successfully",
            error: false,
            success: true
        })

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = updateUser