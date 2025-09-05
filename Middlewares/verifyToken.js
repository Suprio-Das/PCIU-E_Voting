export const isCommissioner = async (req, res, next) => {
    try {
        const token = await req.cookies.token;
        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized user.' })
        }
    } catch (error) {
        return res.send(error);
    }
}