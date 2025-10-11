import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    studentId: {
        type: String,
        required: true,
    },
    isAllowed: {
        type: Boolean,
        required: true
    },
    voted: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['commissioner', 'student'],
        default: 'student'
    }
})

const StudentModel = mongoose.model('Students', StudentSchema, 'Students')
export default StudentModel;