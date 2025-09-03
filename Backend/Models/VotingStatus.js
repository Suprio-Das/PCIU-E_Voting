import mongoose from "mongoose";

const VotingStatusSchema = new mongoose.Schema({
    active: {
        type: Boolean,
        default: false
    }
})

const VotingStatusModel = mongoose.model('VotingStatus', VotingStatusSchema);
export default VotingStatusModel;