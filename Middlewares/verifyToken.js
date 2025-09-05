export const isCommissioner = async (req, res, next) => {
    try {
        console.log("verify token middleware")
    } catch (error) {
        return res.send(error);
    }
}