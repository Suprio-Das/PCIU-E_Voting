import express from 'express'
import { Login, Logout } from '../Controllers/AuthControllers.js';

const AuthRoutes = express.Router();

AuthRoutes.post('/login', Login);
AuthRoutes.post('/logout', Logout);

export default AuthRoutes;