import { useState } from "react";
import api from "../Services/api";
import { useNavigate } from "react-router";

const VoterLogin = () => {
    const [studentId, setStudentId] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await api.post("api/vote/verifyvoter", { studentId });
            if (res.data.success) {
                navigate("/student/vote", { state: { studentId } });
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-170px)] bg-base-200">
            <div className="bg-base-100 p-8 rounded-xl shadow-md w-[400px]">
                <h1 className="text-3xl font-semibold text-center mb-4 text-[#2a3793]">
                    Voter Login
                </h1>
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Enter your Student ID"
                        className="input input-bordered border-[#2a3793] focus:outline-none"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        required
                    />
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <button className="btn bg-[#2a3793] text-white w-full">
                        Proceed to Vote
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VoterLogin;
