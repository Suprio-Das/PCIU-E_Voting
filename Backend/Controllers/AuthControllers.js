import CommissionerModel from "../Models/Commissioner.js";
import jwt from 'jsonwebtoken'

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const commissioner = await CommissionerModel.findOne({ email });
        if (!commissioner) {
            return res.status(404).json({ success: false, message: "Commissioner is not found" })
        }
        if (commissioner.password !== password) {
            return res.status(401).json({ success: false, message: "Incorrect credentials." })
        }
        if (commissioner.role !== 'commissioner') {
            return res.status(401).json({ success: false, message: "Unauthorized login failed." })
        }

        const token = jwt.sign({ userId: commissioner._id }, process.env.JWT_Secret)

        res.cookie('token', token, {
            maxAge: 86400000,
            secure: false,
            httpOnly: true
        })

        return res.status(200).json({ success: true, message: "Commissioner Logged-in successfully", commissioner })
    } catch (error) {
        return res.send(error);
    }
}

export const Logout = async (req, res) => {
    try {
        res.clearCookie('token')
        return res.status(200).json({ success: true, message: 'Commissioner logout successfully' })
    } catch (error) {
        return res.send(error)
    }
}