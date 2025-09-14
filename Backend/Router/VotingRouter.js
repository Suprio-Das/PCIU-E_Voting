import express from 'express'
import { GetCandidateWithPosition } from '../Controllers/VotingController.js';

const VotingRoutes = express.Router();

VotingRoutes.get('/getcandidatewithposition', GetCandidateWithPosition);

export default VotingRoutes;