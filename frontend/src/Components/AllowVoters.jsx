import { useState } from "react";
import api from "../Services/api";

const AllowVoters = () => {
    const [studentId, setStudentId] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");

        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        setStudentId(`CSE ${value}`);
    };

    const handleFocus = () => {
        if (!studentId.startsWith("CSE ")) {
            setStudentId("CSE ");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-170px)]">
            <div className="bg-base-100 p-8 rounded-xl shadow-md w-[400px] border-1 border-[#2a3793]">
                <h1 className="text-3xl font-semibold text-center mb-4 text-[#2a3793]">
                    Allow Voter
                </h1>
                <form className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Enter Voter Student ID"
                        className="input input-bordered border-[#2a3793] focus:outline-none"
                        value={studentId}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        required
                    />
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <button className="btn bg-[#2a3793] text-white w-full">
                        Allow
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AllowVoters;
