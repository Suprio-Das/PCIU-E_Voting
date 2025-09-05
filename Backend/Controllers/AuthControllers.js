import CommissionerModel from "../Models/Commissioner.js";

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
    } catch (error) {
        res.send(error);
    }
}