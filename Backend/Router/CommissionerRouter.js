import express from 'express';
import { isCommissioner } from '../Middlewares/verifyToken.js';
import { AddCandidates, AddPositions, AddVoters, AllowVoter, GetAllPositions, GetElectionResult, ResetElectionInfo, StartElection, StopElection } from '../Controllers/CommissionerControllers.js';
import upload from '../Utils/uploadConfig.js';

const CommissionerRoutes = express.Router();

CommissionerRoutes.post('/createvote', isCommissioner, StartElection);
CommissionerRoutes.post('/stopvote', isCommissioner, StopElection);
CommissionerRoutes.post('/allowvoter', isCommissioner, AllowVoter);

CommissionerRoutes.post(
    "/addcandidates",
    isCommissioner,
    upload.single("symbol"),
    AddCandidates
);

CommissionerRoutes.post('/addvoters', isCommissioner, AddVoters);
CommissionerRoutes.post('/addpositions', isCommissioner, AddPositions);
CommissionerRoutes.get('/positions', isCommissioner, GetAllPositions);
CommissionerRoutes.get('/results', isCommissioner, GetElectionResult);
CommissionerRoutes.post('/resetdb', isCommissioner, ResetElectionInfo);

export default CommissionerRoutes;
