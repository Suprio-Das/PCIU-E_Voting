import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();

// Define PORT
const PORT = process.env.PORT || 3000;

// Create Express APP
const app = express();

// Middlewares
app.use(express.json())
app.use(cors())

