import express from 'express';
import { isCommissioner } from '../Middlewares/verifyToken.js';
import { AddCandidates, AddPositions, AddVoters, GetElectionResult, StartElection, StopElection } from '../Controllers/CommissionerControllers.js';
import upload from '../Utils/uploadConfig.js';

const CommissionerRoutes = express.Router();

CommissionerRoutes.post('/createvote', isCommissioner, StartElection);
CommissionerRoutes.post('/stopvote', isCommissioner, StopElection);

CommissionerRoutes.post(
    '/addcandidates',
    isCommissioner,
    upload.fields([
        { name: "photo", maxCount: 1 },
        { name: "symbol", maxCount: 1 },
    ]),
    AddCandidates
);

CommissionerRoutes.post('/addvoters', isCommissioner, AddVoters);
CommissionerRoutes.post('/addpositions', isCommissioner, AddPositions);
CommissionerRoutes.get('/results', isCommissioner, GetElectionResult);

export default CommissionerRoutes;
