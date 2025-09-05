import express from 'express'
import { isCommissioner } from '../Middlewares/verifyToken.js';
import { StartElection } from '../Controllers/CommissionerControllers.js';

const CommissionerRoutes = express.Router();

CommissionerRoutes.post('/createvote', isCommissioner, StartElection);

export default CommissionerRoutes;