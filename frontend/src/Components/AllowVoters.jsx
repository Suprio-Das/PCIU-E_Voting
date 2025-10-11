import { useState } from "react";
import api from "../Services/api";

const AllowVoters = () => {
    const [studentId, setStudentId] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        setStudentId(`CSE ${value}`);
        setError("");
        setSuccess("");
    };

    const handleFocus = () => {
        if (!studentId.startsWith("CSE ")) {
            setStudentId("CSE ");
        }
    };

    const handleAllowVoter = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const response = await api.post("/api/commissioner/allowvoter", { studentId });
            if (response.data.success) {
                setSuccess(response.data.message);
                setStudentId(""); // clear field
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            console.error(error);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-170px)]">
            <div className="bg-base-100 p-8 rounded-xl shadow-md w-[400px] border border-[#2a3793]">
                <h1 className="text-3xl font-semibold text-center mb-4 text-[#2a3793]">
                    Allow Voter
                </h1>
                <form className="flex flex-col gap-4" onSubmit={handleAllowVoter}>
                    <input
                        type="text"
                        name="studentId"
                        placeholder="Enter Voter Student ID"
                        className="input input-bordered border-[#2a3793] focus:outline-none"
                        value={studentId}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        required
                    />

                    {error && (
                        <p className="text-red-500 text-center font-medium">
                            {error}
                        </p>
                    )}
                    {success && (
                        <p className="text-green-600 text-center font-medium">
                            {success}
                        </p>
                    )}

                    <button
                        type="submit"
                        className={`btn bg-[#2a3793] text-white w-full ${loading ? "opacity-70 cursor-not-allowed" : ""
                            }`}
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Allow"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AllowVoters;