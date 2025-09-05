import VotingStatusModel from "../Models/VotingStatus.js"
import { ObjectId } from 'mongodb';

export const StartElection = async (req, res) => {
    try {
        const elections = await VotingStatusModel.find({})
        const election = elections[0];
        if (election.active === true) {
            return res.status(405).json({ success: false, message: "Election is running. Wait till finished." })
        }

        const query = { _id: new ObjectId(election._id) }

        const updateElection = {
            $set: {
                active: true
            }
        }

        const newUpdatedElection = await VotingStatusModel.updateOne(query, updateElection)

        res.status(200).json({ success: true, message: "Election has Started." }, newUpdatedElection)
    } catch (error) {
        return res.send(error)
    }
}

export const StopElection = async (req, res) => {
    try {
        const elections = await VotingStatusModel.find({})
        const election = elections[0];
        if (election.active === false) {
            return res.status(405).json({ success: false, message: "Election is not running. Start election first." })
        }

        const query = { _id: new ObjectId(election._id) }

        const updateElection = {
            $set: {
                active: false
            }
        }

        const newUpdatedElection = await VotingStatusModel.updateOne(query, updateElection)

        res.status(200).json({ success: true, message: "Election has ended." }, newUpdatedElection)
    } catch (error) {
        return res.send(error)
    }
}