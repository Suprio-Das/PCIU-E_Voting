import CommissionerModel from "../Models/Commissioner.js";
import jwt from 'jsonwebtoken'

export const Login = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        const commissioner = await CommissionerModel.findOne({ email });
        if (!commissioner) {
            res.status(404).json({ success: false, message: "Commissioner is not found" })
        }
        if (commissioner.password !== password) {
            res.status(401).json({ success: false, message: "Incorrect credentials." })
        }

        const token = jwt.sign({ userId: commissioner._id }, process.env.JWT_Secret)

        res.cookies('token', token, {
            maxAge: 86400000,
            secure: false,
            httpOnly: true
        })
    } catch (error) {
        res.send(error);
    }
}