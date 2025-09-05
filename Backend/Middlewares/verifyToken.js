import jwt from 'jsonwebtoken'
import CommissionerModel from '../Models/Commissioner';

export const isCommissioner = async (req, res, next) => {
    try {
        const token = await req.cookies.token;
        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized user.' })
        }

        const decoded_token = jwt.verify(token, process.env.JWT_Secret)
        const commissioner = await CommissionerModel.findById(decoded_token.userId)
        if (!commissioner) {
            return res.status(404).json({ success: false, message: "Commissioner not found" })
        }
    } catch (error) {
        return res.send(error);
    }
}