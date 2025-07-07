const userModel = require("../../models/userModel")
const bcrypt = require('bcrypt');

async function userSignUpController(req, res) {
    try {
        const { email, password, name } = req.body

        const user = await userModel.findOne({ email })
        if (user) {
            throw new Error("User already exists")
        }

        if(!email){
            throw new Error("Email is required")
        }

        if(!password){
            throw new Error("Password is required")
        }

        if(!name){
            throw new Error("Name is required")
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        if(!hashedPassword){
            throw new Error("Password is required")
        }

        const payload = {
            ...req.body,
            role: "USER",
            password : hashedPassword
        }

        const userData = new userModel(payload)
        const saveUser = await userData.save()

        res.json({
            data : saveUser,
            message : "User Created Successfully",
            error : false,
            success : true
        })
    }catch (error) {
        res.json({
            message : error.message || error,
            error : true,
            success : false
        })
    }   
}

module.exports = userSignUpController