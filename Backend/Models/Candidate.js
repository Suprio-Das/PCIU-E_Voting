import mongoose from "mongoose";

const CandidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    studentId: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    symbol: {
        type: String,
        required: true
    }
})

const CandidateModel = mongoose.model('Candidates', CandidateSchema, 'Candidates');
export default CandidateModel;