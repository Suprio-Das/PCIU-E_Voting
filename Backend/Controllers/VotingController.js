import CandidateModel from "../Models/Candidate.js";

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
        console.log("Verify voter")
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