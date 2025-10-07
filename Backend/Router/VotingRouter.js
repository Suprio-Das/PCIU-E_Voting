import express from 'express'
import { GetCandidateWithPosition, GetVoters, SubmitVote, VerifyVoter } from '../Controllers/VotingController.js';
import { isVoter } from '../Middlewares/verifyToken.js';
// import { isVoted } from '../Middlewares/verifyToken.js';

const VotingRoutes = express.Router();

VotingRoutes.get('/getcandidatewithposition', GetCandidateWithPosition);
VotingRoutes.get('/getvoters', GetVoters);
VotingRoutes.post('/verifyvoter', VerifyVoter);
VotingRoutes.post('/submitvote', isVoter, SubmitVote);

export default VotingRoutes;