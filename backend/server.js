import express from "express";
import api from './routes/index.js'
import dotenv from 'dotenv'
import mongoose from "mongoose";
import cors from "cors";

dotenv.config()
mongoose.connect(process.env.MONGODB_PATH, () => {
    console.log('connect');
}, (e) => console.log(e))


const PORT = process.env.SERVER_PORT || 9000
const origin = process.env.CORS_ORIGIN || 'http://localhost:3001'

const app = express()

app.use(cors({
    origin
}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001');  // Allow your frontend origin
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');  // Allowed methods
    res.header('Access-Control-Allow-Headers', 'Content-Type');  // Allowed headers
    res.header('Access-Control-Allow-Credentials', 'true');  // If credentials are needed
    next();
  });
  
app.use(express.json())
app.use(express.urlencoded())

app.use(api)

app.listen(PORT, () => {
    console.log(`Your app is running in http://localhost:${PORT}`)
})