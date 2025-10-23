import { useEffect, useState } from "react";
import api from "../Services/api";

const positionRanking = [
    "President", "Vice President", "General Secretary", "Joint Secretary", "Treasurer",
    "Organizing Secretary", "Event Secretary", "Publicity & Publication Secretary",
    "Information and Research Secretary", "Competitive Programming Secretary",
    "Sports and Cultural Secretary", "Women’s Affairs Secretary", "Executive Members",
];

const ViewCandidates = () => {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCandidates = async () => {
            setLoading(true);
            try {
                const res = await api.get("api/vote/getcandidatewithposition");
                if (res.data.success) {
                    const sorted = res.data.data.sort(
                        (a, b) => positionRanking.indexOf(a.position) - positionRanking.indexOf(b.position)
                    );
                    setCandidates(sorted);
                }
            } catch (error) {
                console.error("Error fetching candidates:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCandidates();
    }, []);

    if (loading) return <div className="text-center py-10 text-gray-600">Loading candidates...</div>;

    if (!candidates.length) return <div className="text-center py-10 text-red-500">No candidates found.</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-center text-[#2a3793] mb-6">
                All Candidates (By Position)
            </h1>

            <div className="overflow-x-auto shadow-lg border border-[#2a3793] rounded-lg p-4 bg-white">
                {candidates.map((res, index) => (
                    <div key={index} className="mb-8">
                        <h2 className="text-lg font-semibold mb-3 text-[#2a3793] border-b border-gray-300 pb-1">
                            {index + 1}. {res.position}
                        </h2>
                        <table className="table w-full border border-gray-200">
                            <thead className="bg-[#2a3793] text-white text-sm">
                                <tr>
                                    <th className="text-center px-2 py-1">#</th>
                                    <th className="text-center px-2 py-1">Candidate Name</th>
                                    <th className="text-center px-2 py-1">Student ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {res.candidates.map((c, i) => (
                                    <tr key={i} className="border-b text-center hover:bg-gray-50">
                                        <td>{i + 1}</td>
                                        <td>{c.name}</td>
                                        <td>{c.studentId}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewCandidates;