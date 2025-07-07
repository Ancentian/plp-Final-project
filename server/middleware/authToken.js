const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
    try {
        const token = req.cookies?.token 
        
        if (!token) {
            return res.json({
                message: "Please Login...",
                error: true,
                success: false
            })
        }

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            // console.log(err)
            // console.log("decoded", decoded)

            if (err) {
                console.log(err)
            }
            req.userId = decoded?.id
            next()
        })
        
    } catch (error) {
        res.status(404).json({ 
            error: error.message || error,
            data: [],
            error: true,
            success: false
        })
    }
}

module.exports = authToken