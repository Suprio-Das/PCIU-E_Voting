import api from "../Services/api";

const AddCandidates = () => {
    const handleAddCandidate = async (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const studentId = form.studentId.value;
        const position = form.position.value;

        const formData = new FormData();
        formData.append("name", name);
        formData.append("studentId", studentId);
        formData.append("position", position);

        // Append files
        if (form.photo.files[0]) {
            formData.append("photo", form.photo.files[0]);
        }
        if (form.symbol.files[0]) {
            formData.append("symbol", form.symbol.files[0]);
        }

        try {
            const res = await api.post(
                "api/commissioner/addcandidates",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            if (res) {
                alert('Candidate Added.')
                form.reset();
            }
        } catch (error) {
            console.error("Error adding candidate:", error);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-semibold text-center my-3">
                Add Candidates
            </h1>
            <div className="flex justify-center">
                <form
                    onSubmit={handleAddCandidate}
                    className="w-[90%] p-2 grid lg:grid-cols-2 grid-cols-1 gap-5"
                >
                    {/* Candidate Name */}
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Enter Candidate Name: </legend>
                        <input
                            type="text"
                            className="input w-full outline-0 border-1 border-[#2a3793] focus-visible:outline-0 focus-visible:border-2"
                            placeholder="Type here"
                            name="name"
                        />
                    </fieldset>

                    {/* Candidate Student ID */}
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">
                            Enter Candidate Student ID:
                        </legend>
                        <input
                            type="text"
                            className="input w-full outline-0 border-1 border-[#2a3793] focus-visible:outline-0 focus-visible:border-2"
                            placeholder="Type here"
                            name="studentId"
                        />
                    </fieldset>

                    {/* Candidate Position */}
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Select Candidate Position</legend>
                        <select
                            defaultValue="Select a position"
                            className="select w-full border-1 border-[#2a3793] rounded-md focus:outline-none focus:border-blue-500"
                            name="position"
                        >
                            <option disabled={true}>Select a position</option>
                            <option>President</option>
                            <option>General Secretary</option>
                            <option>IT Secretary</option>
                        </select>
                    </fieldset>

                    {/* Candidate Photo */}
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Upload Candidate Profile</legend>
                        <input
                            type="file"
                            className="file-input w-full border-1 border-[#2a3793] rounded-md"
                            name="photo"
                        />
                    </fieldset>

                    {/* Candidate Symbol */}
                    <fieldset className="fieldset col-span-2">
                        <legend className="fieldset-legend">Upload Candidate Symbol</legend>
                        <input
                            type="file"
                            className="file-input w-full border-1 border-[#2a3793] rounded-md"
                            name="symbol"
                        />
                    </fieldset>

                    <button className="btn w-full col-span-2 bg-[#2a3793] text-white rounded-md">
                        Add Candidate
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCandidates;
