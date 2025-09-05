import express from 'express'
import VotingStatusModel from '../Models/VotingStatus.js';

const VotingStatusRoutes = express.Router();

VotingStatusRoutes.get('/stats', async (req, res) => {
    const elections = await VotingStatusModel.find({})
    const election = elections[0];
    res.status(200).json(election.active)
})

export default VotingStatusRoutes;