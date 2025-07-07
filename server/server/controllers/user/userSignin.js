const bcrypt = require('bcryptjs')
const userModel = require("../../models/userModel")
const jwt = require("jsonwebtoken")

async function userSigninController(req, res) {
    try {
        const { email, password } = req.body

        if(!email){
            throw new Error("Email is required")
        }

        if(!password){
            throw new Error("Password is required")
        }

        const user = await userModel.findOne({ email })
        
        if (!user) {
            throw new Error("User Not Found")
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        if (checkPassword) {
            const tokenData = {
                id : user._id,
                email : user.email,
                name : user.name
            }
            const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 60 * 8 });

            const tokenOption = {
                httpOnly : true,
                secure : true
            }

            res.cookie("token", token, tokenOption).status(200).json({
                message : "Login successfully",
                data : token,
                success : true,
                error : false
            })
            } else {
                throw new Error("Invalid Password")
            }
    } catch (error) {
        res.json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

module.exports = userSigninController