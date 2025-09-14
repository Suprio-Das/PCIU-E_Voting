export const GetCandidateWithPosition = async (req, res) => {
    try {
        console.log("Candidates with their positions.")
    } catch (error) {
        return res.send(error);
    }
}