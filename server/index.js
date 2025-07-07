const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./server/config/db')
const router = require('./server/routes')


const app = express()
const bodyParser = require("body-parser");

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  }));

// app.use(express.json())
app.use(express.json({ limit: "2mb" }));
app.use(cookieParser())

app.use("/api", router)

const PORT = 8080 || process.env.PORT

connectDB().then(() =>{
    app.listen(PORT,()=>{
        console.log("Connected To DB")
        console.log("Server is running "+PORT)
    })
})
