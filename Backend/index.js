import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import ConnectDB from './Utils/db.js';
import CommissionerRoutes from './Router/CommissionerRouter.js';
import AuthRoutes from './Router/AuthRouter.js';
import cookieParser from 'cookie-parser';
import VotingStatusRoutes from './Router/VotingStatusRouter.js';
import VotingRoutes from './Router/VotingRouter.js';
dotenv.config();

// Define PORT
const PORT = process.env.PORT || 3000;

// Create Express APP
const app = express();

// Middlewares
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
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
app.use('/api/vote', VotingRoutes);
// ======================APP Routes========================\\

app.use("/uploads", express.static("uploads"));

// Listen the Server
app.listen(PORT);