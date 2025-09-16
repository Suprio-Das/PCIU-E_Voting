import mongoose from "mongoose";

const VotingCountSchema = new mongoose.Schema({
    candidateId: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    totalVotes: {
        type: Number
    }
})

const VotingCountModel = mongoose.model('VotingCounts', VotingCountSchema, 'VotingCounts');
export default VotingCountModel;