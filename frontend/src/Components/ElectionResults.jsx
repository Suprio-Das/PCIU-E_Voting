import React from "react";

const ViewCandidates = ({ candidates }) => {
    if (!candidates || candidates.length === 0) {
        return (
            <div className="text-center p-6">
                <h2 className="text-lg text-gray-600 font-medium">No candidates available.</h2>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-center text-[#2a3793] mb-6">
                Candidate List
            </h2>

            <div className="overflow-x-auto">
                <table className="table w-full border">
                    <thead className="bg-[#2a3793] text-white text-sm">
                        <tr>
                            <th className="text-center">#</th>
                            <th className="text-center">Name</th>
                            <th className="text-center">Student ID</th>
                            <th className="text-center">Position</th>
                        </tr>
                    </thead>
                    <tbody>
                        {candidates.map((candidate, index) => (
                            <tr key={index} className="hover:bg-base-200 transition">
                                <td className="text-center">{index + 1}</td>
                                <td className="text-center font-medium">{candidate.name}</td>
                                <td className="text-center">{candidate.studentId}</td>
                                <td className="text-center">{candidate.position}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewCandidates;
