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
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
dotenv.config();

// Define PORT
const PORT = process.env.PORT || 3000;

// Create Express APP
const app = express();

// Create HTTP server for socket.io
const server = http.createServer(app);

// Socket configuration
export const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
});

// Handling socket connections
io.on("connection", (socket) => {
    console.log("🟢 A commissioner connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("🔴 A commissioner disconnected:", socket.id);
    });
});

// Middlewares
app.use(express.json())
app.use(cors({
    origin: true, // Allow all LAN origins
    credentials: true
}));
app.use(cookieParser())

// Database Connection
ConnectDB();

// Default Server route
app.get('/', (req, res) => {
    res.send('PCIU E-voting server is runnning.')
})

// --------------------------------For Serving over LAN------------------------------------
// // static files
// app.use(express.static(path.join(__dirname, 'client-build')));

// // serve React app for all non-API routes
// app.use((req, res, next) => {
//     if (req.path.startsWith('/api')) return next();
//     res.sendFile(path.join(__dirname, 'client-build', 'index.html'));
// });

// ======================APP Routes========================\\
app.use('/api/auth', AuthRoutes);
app.use('/api/commissioner', CommissionerRoutes);
app.use('/api/votestats', VotingStatusRoutes)
app.use('/api/vote', VotingRoutes);
// ======================APP Routes========================\\

app.use("/uploads", express.static("uploads"));


server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});