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
    voted: {
        type: Boolean,
        default: false,
        required: true
    }
})

const StudentModel = mongoose.model('Students', StudentSchema)
export default StudentModel;