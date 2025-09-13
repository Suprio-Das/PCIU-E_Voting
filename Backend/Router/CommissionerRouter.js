import express from 'express'
import { isCommissioner } from '../Middlewares/verifyToken.js';
import { AddCandidates, AddVoters, StartElection, StopElection } from '../Controllers/CommissionerControllers.js';

const CommissionerRoutes = express.Router();

CommissionerRoutes.post('/createvote', isCommissioner, StartElection);
CommissionerRoutes.post('/stopvote', isCommissioner, StopElection);
CommissionerRoutes.post('/addcandidates', isCommissioner, AddCandidates);
CommissionerRoutes.post('/addvoters', isCommissioner, AddVoters);

export default CommissionerRoutes;