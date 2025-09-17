import CandidateModel from "../Models/Candidate.js";
import StudentModel from "../Models/Student.js";
import VotingCountModel from "../Models/VoteCount.js";
import VotingStatusModel from "../Models/VotingStatus.js"
import { ObjectId } from 'mongodb';

export const StartElection = async (req, res) => {
    try {
        const elections = await VotingStatusModel.find({})
        const election = elections[0];
        if (election.active === true) {
            return res.status(405).json({ success: false, message: "Election is running. Wait till finished." })
        }

        const query = { _id: new ObjectId(election._id) }

        const updateElection = {
            $set: {
                active: true
            }
        }

        const newUpdatedElection = await VotingStatusModel.updateOne(query, updateElection)

        res.status(200).json({ success: true, message: "Election has Started." }, newUpdatedElection)
    } catch (error) {
        return res.send(error)
    }
}

export const StopElection = async (req, res) => {
    try {
        const elections = await VotingStatusModel.find({})
        const election = elections[0];
        if (election.active === false) {
            return res.status(405).json({ success: false, message: "Election is not running. Start election first." })
        }

        const query = { _id: new ObjectId(election._id) }

        const updateElection = {
            $set: {
                active: false
            }
        }

        const newUpdatedElection = await VotingStatusModel.updateOne(query, updateElection)

        res.status(200).json({ success: true, message: "Election has ended." }, newUpdatedElection)
    } catch (error) {
        return res.send(error)
    }
}

export const AddCandidates = async (req, res) => {
    try {
        const candidates = req.body;

        const newCandidates = await CandidateModel.insertMany(candidates);

        if (!newCandidates) {
            return res.send(404).json({ success: false, message: "Unable to add candidate." })
        }

        return res.status(200).json({ success: true, message: "New Candidate Created." });

    } catch (error) {
        res.send(error);
    }
}

export const AddVoters = async (req, res) => {
    try {
        const voters = req.body;
        if (!voters) {
            return res.status(404).json({ success: false, message: "No voters are found." })
        }
        const newVoters = await StudentModel.insertMany(voters);
        if (!newVoters) {
            return res.status(400).json({ succes: false, message: "Error while adding new voters." });
        }
        return res.status(200).json({ success: true, message: "New voters are added." })
    } catch (error) {
        return res.send(error);
    }
}

export const GetElectionResult = async (req, res) => {
    try {

        const ElectionResults = await VotingCountModel.aggregate([
            // Step 0: ensure candidateId is ObjectId
            {
                $addFields: {
                    candidateId: { $toObjectId: "$candidateId" }
                }
            },

            // Step 1: group by position
            {
                $group: {
                    _id: "$position",
                    maxVotes: { $max: "$totalVotes" },
                    candidates: {
                        $push: {
                            candidateId: "$candidateId",
                            totalVotes: "$totalVotes"
                        }
                    }
                }
            },

            // Step 2: keep only max vote winners
            {
                $project: {
                    position: "$_id",
                    winners: {
                        $filter: {
                            input: "$candidates",
                            as: "c",
                            cond: { $eq: ["$$c.totalVotes", "$maxVotes"] }
                        }
                    }
                }
            },

            // Step 3: unwind winners for lookup
            { $unwind: "$winners" },

            // Step 4: lookup candidate details
            {
                $lookup: {
                    from: "Candidates",
                    localField: "winners.candidateId",
                    foreignField: "_id",
                    as: "candidateInfo"
                }
            },
            { $unwind: "$candidateInfo" },

            // Step 5: merge
            {
                $project: {
                    _id: 0,
                    position: 1,
                    winner: {
                        totalVotes: "$winners.totalVotes",
                        candidate: "$candidateInfo"
                    }
                }
            },

            // Step 6: regroup winners in case of tie
            {
                $group: {
                    _id: "$position",
                    winners: { $push: "$winner" }
                }
            },

            {
                $project: {
                    _id: 0,
                    position: "$_id",
                    winners: 1
                }
            }
        ]);


        return res.status(200).json({ success: true, ElectionResults });
    } catch (error) {
        return res.send(error);
    }
}