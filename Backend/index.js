import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();

// Create Express APP
const app = express();

// Middlewares
app.use(express.json())
app.use(cors())