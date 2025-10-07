import CandidateModel from "../Models/Candidate.js";
import StudentModel from "../Models/Student.js";
import { ObjectId } from 'mongodb'
import VotingCountModel from "../Models/VoteCount.js";

export const GetCandidateWithPosition = async (req, res) => {
    try {
        const candidates = await CandidateModel.find();
        if (!candidates) {
            return res.status(404).json({ success: false, message: "Candidates are not found." })
        }
        return res.status(200).json({ success: true, data: candidates });
    } catch (error) {
        return res.send(error);
    }
}

export const VerifyVoter = async (req, res) => {
    try {
        const { studentId } = req.body;
        const query = { studentId: studentId };
        const student = await StudentModel.findOne(query)
        if (!student) {
            return res.status(404).json({ success: false, message: "No information found." });
        }
        if (student.voted === true) {
            return res.status(401).json({ success: false, message: "Already voted." })
        }
        return res.status(200).json({ success: true, message: "Voter logged-in successfully." })
    } catch (error) {
        return res.send(error);
    }
}

export const SubmitVote = async (req, res) => {
    try {
        const { studentId, candidates } = req.body;
        const query = { studentId: studentId };
        const student = await StudentModel.findOne(query);

        // Update student voting status to voted
        const updatedVoteStatus = {
            $set: {
                voted: true
            }
        }
        const updateQuery = { _id: new ObjectId(student._id) }
        const updatedStudent = await StudentModel.findByIdAndUpdate(updateQuery, updatedVoteStatus)
        if (!updatedStudent) {
            return res.status(501).json({ success: false, message: "Issues while submitting vote." })
        }

        // Adding votes to the candidates
        for (const candidate of candidates) {
            const filter = { _id: new ObjectId(candidate) }
            // Finding the candidate position
            const currentCandidatePosition = await CandidateModel.findById(candidate);
            const currentVoteCount = await VotingCountModel.findOne(filter);
            let update;
            if (!currentVoteCount) {
                update = {
                    $set: {
                        candidateId: candidate,
                        position: currentCandidatePosition.position,
                        totalVotes: 1
                    }
                }
            } else {
                update = {
                    $set: {
                        totalVotes: currentVoteCount.totalVotes + 1
                    }
                }
            }

            const options = { upsert: true, new: true };
            console.log(update);
            await VotingCountModel.findOneAndUpdate(filter, update, options);
        }
        return res.status(200).json({ success: true, message: "Voted successfully." })
    } catch (error) {
        res.send(error);
    }
}

export const GetVoters = async (req, res) => {
    try {
        const voters = await StudentModel.find();
        return res.status(200).json({ success: true, data: voters });
    } catch (error) {
        return res.send(error);
    }
}