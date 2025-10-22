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
        // Checking Student already allowed
        if (Student.isAllowed === true) {
            return res.json({ success: false, message: "Student Already Allowed." })
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

        // const symbolPath = req.file ? req.file.path.replace(/\\/g, "/") : null;
        // const fullSymbolUrl = symbolPath
        //     ? `${req.protocol}://${req.get("host")}/${symbolPath}`
        //     : null;

        const fullSymbolUrl = req.file ? req.file.path : null;

        if (!name || !studentId || !position || !fullSymbolUrl) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        const isCandidateExist = await CandidateModel.findOne({ studentId });
        if (isCandidateExist) {
            return res.status(401).json({ success: false, message: "Candidate already added." })
        }

        const newCandidate = await CandidateModel.create({
            name,
            studentId,
            position,
            symbol: fullSymbolUrl,
        });

        const newVotingCounts = await VotingCountModel.create({
            candidateId: newCandidate._id,
            position: position,
            totalVotes: 0
        })

        console.log(newVotingCounts)

        return res.status(200).json({
            success: true,
            message: "Candidate added successfully.",
            data: newCandidate,
        });
    } catch (error) {
        console.error("Error in AddCandidates:", error);
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
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
            {
                $addFields: {
                    candidateId: { $toObjectId: "$candidateId" }
                }
            },

            // Lookup candidate details
            {
                $lookup: {
                    from: "Candidates",
                    localField: "candidateId",
                    foreignField: "_id",
                    as: "candidateInfo"
                }
            },
            { $unwind: "$candidateInfo" },

            // Group all candidates by position
            {
                $group: {
                    _id: "$position",
                    candidates: {
                        $push: {
                            candidateId: "$candidateId",
                            name: "$candidateInfo.name",
                            studentId: "$candidateInfo.studentId",
                            symbol: "$candidateInfo.symbol",
                            totalVotes: "$totalVotes"
                        }
                    },
                    maxVotes: { $max: "$totalVotes" } // track top vote count
                }
            },

            // Project: sort candidates and mark winners
            {
                $project: {
                    _id: 0,
                    position: "$_id",
                    candidates: {
                        $sortArray: { input: "$candidates", sortBy: { totalVotes: -1 } }
                    },
                    winners: {
                        $filter: {
                            input: "$candidates",
                            as: "c",
                            cond: { $eq: ["$$c.totalVotes", "$maxVotes"] }
                        }
                    }
                }
            }
        ]);

        return res.status(200).json({
            success: true,
            ElectionResults
        });

    } catch (error) {
        console.error("Error in GetElectionResult:", error);
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

export const ResetElectionInfo = async (req, res) => {
    try {
        const Candidates = await CandidateModel.deleteMany({})
        const Positions = await PositionModel.deleteMany({});
        const Students = await StudentModel.deleteMany({});
        const VotingCounts = await VotingCountModel.deleteMany({});

        if (!Candidates || !Positions || !Students || !VotingCounts) {
            return res.status(201).json({ success: false, message: 'Error clearing Database.' })
        }
        return res.status(200).json({ success: true, message: 'Database cleared successfully.' })
    } catch (error) {
        return res.json({ message: 'Server error' })
    }
}