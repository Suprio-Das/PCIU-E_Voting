import CandidateModel from "../Models/Candidate.js";
import StudentModel from "../Models/Student.js";

export const GetCandidateWithPosition = async (req, res) => {
    try {
        const candidates = await CandidateModel.find();
        if (!candidates) {
            return res.status(404).json({ success: false, message: "Candidates are not found." })
        }
        return res.status(200).json({ success: true, candidates });
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
        console.log("Vote submission.")
    } catch (error) {
        res.send(error);
    }
}