import express from 'express'
import { GetCandidateWithPosition, SubmitVote } from '../Controllers/VotingController.js';

const VotingRoutes = express.Router();

VotingRoutes.get('/getcandidatewithposition', GetCandidateWithPosition);
VotingRoutes.post('/submitvote', SubmitVote);

export default VotingRoutes;