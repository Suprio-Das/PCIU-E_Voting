import CandidateModel from "../Models/Candidate.js";
import PositionModel from "../Models/Position.js";
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

export const AllowVoter = async (req, res) => {
    try {
        const request = req.body;
        const studentId = request.studentId;
        // Checking Student already voted
        const Student = await StudentModel.findOne({ studentId: studentId })
        if (Student.voted === true) {
            return res.json({ success: false, message: "Student Already Voted." })
        }
        // Update student record to allow voting
        const updatedStudent = await StudentModel.findOneAndUpdate(
            { studentId },
            { $set: { isAllowed: true } },
            { new: true }
        );
        return res.json({
            success: true,
            message: "Student allowed to vote successfully.",
            data: updatedStudent
        });
    } catch (error) {
        return res.send(error)
    }
}

export const AddPositions = async (req, res) => {
    try {
        const positions = req.body;

        if (!positions || positions.length === 0) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const positionObjects = positions.map((pos) => ({ name: pos }));

        const newPositions = await PositionModel.insertMany(positionObjects);

        res.status(200).json({
            success: true,
            message: "Positions added successfully.",
            data: newPositions,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

export const GetAllPositions = async (req, res) => {
    try {
        const positions = await PositionModel.find();
        res.status(200).json({
            success: true,
            message: "All Positions fetched.",
            data: positions,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
}

export const AddCandidates = async (req, res) => {
    try {
        const { name, studentId, position } = req.body;

        const photoPath = req.files["photo"] ? req.files["photo"][0].path.replace(/\\/g, "/") : null;
        const symbolPath = req.files["symbol"] ? req.files["symbol"][0].path.replace(/\\/g, "/") : null;

        const fullPhotoUrl = `${req.protocol}://${req.get("host")}/${photoPath}`;
        const fullSymbolUrl = `${req.protocol}://${req.get("host")}/${symbolPath}`;


        if (!name || !studentId || !position || !photoPath || !symbolPath) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        const newCandidate = await CandidateModel.create({
            name,
            studentId,
            position,
            photo: fullPhotoUrl,
            symbol: fullSymbolUrl,
        });

        res.status(200).json({
            success: true,
            message: "Candidate added successfully.",
            data: newCandidate,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error", error });
    }
};

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