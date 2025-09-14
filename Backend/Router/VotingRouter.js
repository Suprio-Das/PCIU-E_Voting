import express from 'express'
import { GetCandidateWithPosition, SubmitVote, VerifyVoter } from '../Controllers/VotingController.js';
import { isVoted } from '../Middlewares/verifyToken.js';

const VotingRoutes = express.Router();

VotingRoutes.get('/getcandidatewithposition', GetCandidateWithPosition);
VotingRoutes.post('/verifyvoter', VerifyVoter);
VotingRoutes.post('/submitvote', SubmitVote);

export default VotingRoutes;