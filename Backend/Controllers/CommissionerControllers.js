import VotingStatusModel from "../Models/VotingStatus.js"

const StartElection = async (req, res) => {
    try {
        const election = await VotingStatusModel.find({})
        if (election) {
            return res.status(405).json({ success: false, message: "Election is running. Can not operate another" })
        }
    } catch (error) {

    }
}