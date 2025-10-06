import { useState } from "react";
import api from "../Services/api";

const AddPositions = () => {
    const [positions, setPositions] = useState([""]); // initial empty position
    const [loading, setLoading] = useState(false);

    // Handle input change
    const handleChange = (index, value) => {
        const updated = [...positions];
        updated[index] = value;
        setPositions(updated);
    };

    // Add new input field
    const addField = () => setPositions([...positions, ""]);

    // Remove input field
    const removeField = (index) => {
        const updated = positions.filter((_, i) => i !== index);
        setPositions(updated);
    };

    // Submit positions
    const handleSubmit = async (e) => {
        e.preventDefault();
        const filteredPositions = positions.filter((p) => p.trim() !== "");

        if (filteredPositions.length === 0) {
            alert("Add at least one position");
            return;
        }

        try {
            setLoading(true);
            const res = await api.post("/api/commissioner/addpositions", filteredPositions);
            console.log("Positions added:", res.data);
            alert("Positions added successfully!");
            setPositions([""]);
        } catch (error) {
            console.error("Error adding positions:", error);
            alert("Error adding positions");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-5">
            <h1 className="text-3xl font-semibold text-center mb-5">Add Election Positions</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {positions.map((pos, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <input
                            type="text"
                            placeholder="Enter position name"
                            value={pos}
                            onChange={(e) => handleChange(index, e.target.value)}
                            className="input w-full outline-0 border-1 border-[#2a3793] focus-visible:outline-0 focus-visible:border-2"
                        />
                        {positions.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeField(index)}
                                className="btn btn-sm bg-red-700 text-white"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                ))}
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={addField}
                        className="btn bg-green-700 text-white"
                    >
                        Add More
                    </button>
                    <button
                        type="submit"
                        className={`btn bg-[#2a3793] text-white ${loading ? "loading" : ""}`}
                    >
                        {loading ? "Saving..." : "Save Positions"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddPositions;
