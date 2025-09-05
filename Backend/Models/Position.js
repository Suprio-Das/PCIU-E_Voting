import mongoose from "mongoose";

const PositionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

const PositionModel = mongoose.model('Positions', PositionSchema, 'Positions');
export default PositionModel;