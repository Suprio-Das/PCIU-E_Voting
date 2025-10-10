import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import api from "../Services/api";

const positionRanking = [
    "President",
    "General Secretary",
    "Joint-General Secretary",
    "Secretary of Competitive Programming",
    "Joint-Secretary of Competitive Programming",
    "Organising Secretary",
    "Finance Secretary",
    "IT Secretary",
    "Office Secretary",
    "Writing & Publishing Secretary",
    "Publicity Editor",
    "Research and Development Secretary",
    "Sports Editor",
    "Event Editor",
    "Library Editor",
    "Cultural Editor",
    "Human Resource Secretary",
    "Head of Disciplinary Commission",
];

const VotingPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const studentId = location.state?.studentId;

    const [candidates, setCandidates] = useState([]);
    const [selectedVotes, setSelectedVotes] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!studentId) navigate("/student");
        fetchCandidates();
    }, []);

    const fetchCandidates = async () => {
        try {
            const res = await api.get("api/vote/getcandidatewithposition");
            const sorted = res.data.data.sort(
                (a, b) =>
                    positionRanking.indexOf(a.position) - positionRanking.indexOf(b.position)
            );
            setCandidates(sorted);
        } catch (error) {
            console.error("Error fetching candidates:", error);
        }
    };

    const handleVoteSelect = (position, candidateId) => {
        setSelectedVotes((prev) => ({ ...prev, [position]: candidateId }));
    };

    const handleSubmitVotes = async () => {
        const totalPositions = Object.keys(groupedCandidates).length;
        const selectedCount = Object.keys(selectedVotes).length;

        if (selectedCount < totalPositions) {
            return alert("Please cast your vote for every position before submitting!");
        }

        const candidateIds = Object.values(selectedVotes);
        if (candidateIds.length === 0)
            return alert("Please select at least one candidate!");

        setLoading(true);
        try {
            const res = await api.post("api/vote/submitvote", {
                studentId,
                candidates: candidateIds,
            });
            if (res.data.success) {
                alert("✅ Your vote has been successfully submitted!");
                navigate("/student");
            }
        } catch (error) {
            console.error(error);
            alert("❌ Failed to submit votes.");
        } finally {
            setLoading(false);
        }
    };


    // Group candidates by position
    const groupedCandidates = candidates.reduce((acc, c) => {
        if (!acc[c.position]) acc[c.position] = [];
        acc[c.position].push(c);
        return acc;
    }, {});
    console.log(candidates)
    return (
        <div className="min-h-screen bg-base-200 p-6">
            <div className="max-w-6xl min-h-8xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-[#2a3793] mb-8">
                    Cast Your Vote
                </h1>

                {Object.keys(groupedCandidates).map((position) => (
                    <div key={position} className="mb-10">
                        <h2 className="text-xl font-semibold mb-3 border-b pb-2">{position}</h2>
                        <div className="grid md:grid-cols-3 gap-5">
                            {groupedCandidates[position].map((c) => (
                                <div
                                    key={c._id}
                                    className={`card bg-base-100 border border-[#2a3793] shadow-sm ${selectedVotes[position] === c._id ? "ring-2 ring-[#2a3793]" : ""
                                        }`}
                                >
                                    <div className="card-body items-center text-center">
                                        <div className="flex items-center gap-5">
                                            <img
                                                src={c.photo}
                                                alt={c.name}
                                                className="w-20 h-20 object-contain border-1 rounded-xl"
                                            />
                                            <div>
                                                <h3 className="font-bold text-lg">{c.name}</h3>
                                                <p className="text-sm text-gray-600">{c.position}</p>
                                                <p className="text-sm text-gray-600">{c.studentId}</p>
                                            </div>
                                            <img
                                                src={c.symbol}
                                                alt={c.name}
                                                className="w-20 h-20 object-contain border-1 rounded-xl"
                                            />
                                        </div>
                                        <button
                                            onClick={() => handleVoteSelect(position, c._id)}
                                            className={`btn w-full mt-3 ${selectedVotes[position] === c._id
                                                ? "bg-[#2a3793] text-white"
                                                : "btn-outline border-[#2a3793] text-[#2a3793]"
                                                }`}
                                        >
                                            {selectedVotes[position] === c._id ? "Selected" : "Vote"}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <div className="text-center mt-8">
                    <button
                        disabled={
                            loading ||
                            Object.keys(selectedVotes).length < Object.keys(groupedCandidates).length
                        }
                        onClick={handleSubmitVotes}
                        className={`btn w-64 ${Object.keys(selectedVotes).length < Object.keys(groupedCandidates).length
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-[#2a3793] text-white"
                            }`}
                    >
                        {loading
                            ? "Submitting..."
                            : Object.keys(selectedVotes).length < Object.keys(groupedCandidates).length
                                ? "Please vote all positions"
                                : "Submit Vote"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VotingPage;
