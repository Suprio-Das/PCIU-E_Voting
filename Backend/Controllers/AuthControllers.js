import CommissionerModel from "../Models/Commissioner.js";

export const Login = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        const commissioner = await CommissionerModel.findOne({ email });
        if (!commissioner) {
            res.status(404).json({ success: false, message: "Commissioner is not found" })
        }
    } catch (error) {
        res.send(error);
    }
}