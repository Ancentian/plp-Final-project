const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./server/config/db')
const router = require('./server/routes')


const app = express()
const bodyParser = require("body-parser");

const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:3000'
];

//app.use(cors({
    //origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    //credentials: true
  //}));

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.options('*', cors()); // Handle preflight requests

// app.use(express.json())
app.use(express.json({ limit: "2mb" }));
app.use(cookieParser())

// Root route
app.get('/', (req, res) => {
  res.send('Ancent E-commerce API is running successfully🚀');
});

app.use("/api", router)

const PORT = 8080 || process.env.PORT

connectDB().then(() =>{
    app.listen(PORT,()=>{
        console.log("Connected To DB")
        console.log("Server is running "+PORT)
    })
})
