import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import ConnectDB from './Utils/db.js';
import CommissionerRoutes from './Router/CommissionerRouter.js';
import AuthRoutes from './Router/AuthRouter.js';
import cookieParser from 'cookie-parser';
import VotingStatusRoutes from './Router/VotingStatusRouter.js';
import VotingRoutes from './Router/VotingRouter.js';
import http from 'http';
import { Server } from 'socket.io';
dotenv.config();

// Define PORT
const PORT = process.env.PORT || 3000;

// Create Express APP
const app = express();

// Create HTTP server for Socket.IO
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
    cors: {
        origin: 'https://pciu-evoting.vercel.app',
        credentials: true,
    },
});

let commissioners = [];
io.on('connection', (socket) => {
    console.log('🟢 New client connected:', socket.id);

    socket.on('join_commissioner', () => {
        commissioners.push(socket.id);
        console.log('Commissioner joined:', socket.id);
    });

    socket.on('disconnect', () => {
        commissioners = commissioners.filter((id) => id !== socket.id);
        console.log('🔴 Client disconnected:', socket.id);
    });
});

// Middlewares
app.use(express.json())
app.use(cors({
    origin: 'https://pciu-evoting.vercel.app/',
    credentials: true
}));
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

// app.use("/uploads", express.static("uploads"));

export { io };

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});