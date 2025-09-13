import express from 'express'
import { isCommissioner } from '../Middlewares/verifyToken.js';
import { AddCandidates, StartElection, StopElection } from '../Controllers/CommissionerControllers.js';

const CommissionerRoutes = express.Router();

CommissionerRoutes.post('/createvote', isCommissioner, StartElection);
CommissionerRoutes.post('/stopvote', isCommissioner, StopElection);
CommissionerRoutes.post('/addcandidates', isCommissioner, AddCandidates);

export default CommissionerRoutes;