export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        res.send({ email, password });
    } catch (error) {
        res.send(error);
    }
}