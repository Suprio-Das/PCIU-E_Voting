import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import ConnectDB from './Utils/db.js';
dotenv.config();

// Define PORT
const PORT = process.env.PORT || 3000;

// Create Express APP
const app = express();

// Middlewares
app.use(express.json())
app.use(cors())

// Database Connection
ConnectDB();

// Default Server route
app.get('/', (req, res) => {
    res.send('PCIU E-voting server is runnning.')
})

// Listen the Server
app.listen(PORT);