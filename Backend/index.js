import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import ConnectDB from './Utils/db.js';
import CommissionerRoutes from './Router/CommissionerRouter.js';
import AuthRoutes from './Router/AuthRouter.js';
import cookieParser from 'cookie-parser';
import VotingStatusRoutes from './Router/VotingStatusRouter.js';
dotenv.config();

// Define PORT
const PORT = process.env.PORT || 3000;

// Create Express APP
const app = express();

// Middlewares
app.use(express.json())
app.use(cors())
app.use(cookieParser())

// Database Connection
ConnectDB();

// Default Server route
app.get('/', (req, res) => {
    res.send('PCIU E-voting server is runnning.')
})

// ======================APP Routes========================\\
app.use('/api/auth', AuthRoutes);
app.use('/api/commissioner', CommissionerRoutes);
app.use('/api/votestats', VotingStatusRoutes)
// ======================APP Routes========================\\

// Listen the Server
app.listen(PORT);