import mongoose from "mongoose";

const CommissionerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['commissioner', 'student'],
        default: 'student'
    }
})

const CommissionerModel = mongoose.model('Commissioner', CommissionerSchema, 'Commissioner');
export default CommissionerModel;