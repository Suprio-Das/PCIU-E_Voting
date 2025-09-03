import express from 'express'
import { Login } from '../Controllers/AuthControllers.js';

const AuthRoutes = express.Router();

AuthRoutes.post('/login', Login);

export default AuthRoutes;