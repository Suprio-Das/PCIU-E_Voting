import { useState } from "react";
import * as XLSX from "xlsx";
import api from "../Services/api";

const AddCandidates = ({ setRefresh }) => {
    const [file, setFile] = useState(null);
    const [candidates, setCandidates] = useState([]);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        setFile(selectedFile);

        const reader = new FileReader();
        reader.onload = (evt) => {
            const bstr = evt.target.result;
            const workbook = XLSX.read(bstr, { type: "binary" });

            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            // Convert to JSON
            const jsonData = XLSX.utils.sheet_to_json(sheet);
            setCandidates(jsonData);
            console.log("Parsed Candidates JSON:", jsonData);
        };
        reader.readAsBinaryString(selectedFile);
    };

    const handleUpload = async () => {
        if (!candidates || candidates.length === 0) {
            alert("Please upload a valid Excel file first.");
            return;
        }

        setUploading(true);
        try {
            const res = await api.post("/api/commissioner/addcandidates", candidates);
            alert(res.data.message || "Candidates added successfully!");
            console.log("Server Response:", res.data);
            setFile(null);
            setCandidates([]);
            setRefresh(prev => !prev);
        } catch (error) {
            console.error("Error uploading candidates:", error);
            alert("Error uploading candidates!");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="p-6 rounded-lg border border-base-300 bg-base-200">
            <h2 className="text-xl font-semibold mb-4 text-center">📥 Upload Candidates Excel File</h2>
            <h1 className="text-center mb-3">The Excel file should contain the below columns:</h1>
            <div className="overflow-x-auto mb-3">
                <table className="table table-zebra table-xs text-center">
                    <thead>
                        <tr>
                            <th></th>
                            <th>name</th>
                            <th>studentId</th>
                            <th>position</th>
                            <th>symbol</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>1</th>
                            <td>Suprio Das</td>
                            <td>CSE 02807546</td>
                            <td>President</td>
                            <td>symbol.png</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center">
                <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileChange}
                    className="file-input file-input-bordered w-full max-w-xs"
                />
            </div>

            {candidates.length > 0 && (
                <div className="mt-4">
                    <p className="font-medium text-sm mb-2">✅ {candidates.length} candidates ready to upload.</p>
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

export default AddCandidates;