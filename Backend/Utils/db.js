import mongoose from "mongoose";

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log("MongoDB is running locally")
    } catch (error) {
        console.log(error)
    }
}

export default ConnectDB;