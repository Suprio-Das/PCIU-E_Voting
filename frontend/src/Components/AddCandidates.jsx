const AddCandidates = () => {
    return (
        <div>
            <h1 className="text-3xl font-semibold text-center my-3">Add Candidates</h1>
            <div className="flex justify-center">
                <form className="w-[90%] p-2 grid lg:grid-cols-2 grid-cols-1 gap-5">
                    {/* Candidate Name */}
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Enter Candidate Name: </legend>
                        <input type="text" className="input w-full outline-0 border-1 border-[#2a3793] focus-visible:outline-0 focus-visible:border-2" placeholder="Type here" />
                    </fieldset>
                    {/* Candidate Student ID */}
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Enter Candidate Student ID: </legend>
                        <input type="text" className="input w-full outline-0 border-1 border-[#2a3793] focus-visible:outline-0 focus-visible:border-2" placeholder="Type here" />
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default AddCandidates;