import { useState } from "react";
import * as XLSX from "xlsx";
import api from "../Services/api";

const AddVoters = () => {
    const [file, setFile] = useState(null);
    const [voters, setVoters] = useState([]);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        setFile(selectedFile);

        const reader = new FileReader();
        reader.onload = (evt) => {
            const bstr = evt.target.result;
            const workbook = XLSX.read(bstr, { type: "binary" });

            // Assuming the first sheet
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            // Convert to JSON
            const jsonData = XLSX.utils.sheet_to_json(sheet);
            setVoters(jsonData);
            console.log("Parsed Voters JSON:", jsonData);
        };
        reader.readAsBinaryString(selectedFile);
    };

    const handleUpload = async () => {
        if (voters?.length === 0) {
            alert("Please upload a valid Excel file first.");
            return;
        }

        setUploading(true);
        try {
            const res = await api.post("/api/commissioner/addvoters", voters);
            alert(res.data.message || "Voters added successfully!");
            console.log("Server Response:", res.data);
            setFile(null);
            setVoters([]);
        } catch (error) {
            console.error("Error uploading voters:", error);
            alert("Error uploading voters!");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="p-6 rounded-lg border border-base-300 bg-base-200">
            <h2 className="text-xl font-semibold mb-4">📥 Upload Voters Excel File</h2>
            <h1>The Excel file should contain the below columns:</h1>
            <div className="overflow-x-auto mb-3">
                <table className="table table-zebra table-xs text-center">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>name</th>
                            <th>studentId</th>
                            <th>voted</th>
                            <th>role</th>
                            <th>isAllowed</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="">
                            <th>1</th>
                            <td>Suprio Das</td>
                            <td>CSE 02807546</td>
                            <td>false</td>
                            <td>student</td>
                            <td>false</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
                className="file-input file-input-bordered w-full max-w-xs"
            />

            {voters.length > 0 && (
                <div className="mt-4">
                    <p className="font-medium text-sm mb-2">✅ {voters.length} voters ready to upload.</p>
                    <button
                        onClick={handleUpload}
                        disabled={uploading}
                        className="btn bg-[#2a3793] text-white"
                    >
                        {uploading ? "Uploading..." : "Upload to Database"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddVoters;
