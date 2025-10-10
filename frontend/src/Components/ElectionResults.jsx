import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "../Services/api";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';

const positionRanking = [
    "President",
    "General Secretary",
    "Joint-General Secretary",
    "Secretary of Competitive Programming",
    "Joint-Secretary of Competitive Programming",
    "Organising Secretary",
    "Finance Secretary",
    "IT Secretary",
    "Office Secretary",
    "Writing & Publishing Secretary",
    "Publicity Editor",
    "Research and Development Secretary",
    "Sports Editor",
    "Event Editor",
    "Library Editor",
    "Cultural Editor",
    "Human Resource Secretary",
    "Head of Disciplinary Commission",
];

const ElectionResult = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isVotingActive, setIsVotingActive] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        checkVotingStatus();
    }, []);

    const checkVotingStatus = async () => {
        try {
            const res = await api.get("api/votestats/stats");
            const { active } = res.data;
            setIsVotingActive(active);

            if (active) {
                alert("Election is still ongoing. Results are not available yet!");
                navigate("/");
            } else {
                fetchResults();
            }
        } catch (error) {
            console.error("Error checking voting status:", error);
        }
    };

    // const fetchResults = async () => {
    //     setLoading(true);
    //     try {
    //         const res = await api.get("api/commissioner/results");
    //         if (res.data.success) {
    //             setResults(res.data.ElectionResults);
    //         }
    //     } catch (error) {
    //         console.error("Error fetching results:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // const handleDownloadPDF = () => {
    //     const doc = new jsPDF();
    //     doc.setFontSize(18);
    //     doc.text("Election Results Summary", 14, 15);
    //     doc.setFontSize(12);
    //     doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 25);

    //     let y = 35;
    //     results.forEach((res, index) => {
    //         doc.setFont("helvetica", "bold");
    //         doc.text(`${index + 1}. ${res.position}`, 14, y);
    //         y += 6;

    //         res.winners.forEach((winner, i) => {
    //             doc.setFont("helvetica", "normal");
    //             doc.text(
    //                 `Name: ${winner.candidate.name} | Student ID: ${winner.candidate.studentId} | Votes: ${winner.totalVotes}`,
    //                 20,
    //                 y
    //             );
    //             y += 6;
    //         });

    //         y += 5;
    //         if (y > 270) {
    //             doc.addPage();
    //             y = 20;
    //         }
    //     });

    //     doc.save("Election_Results.pdf");
    // };

    const fetchResults = async () => {
        setLoading(true);
        try {
            const res = await api.get("api/commissioner/results");
            if (res.data.success) {
                const rankedResults = res.data.ElectionResults.sort((a, b) => {
                    const indexA = positionRanking.indexOf(a.position);
                    const indexB = positionRanking.indexOf(b.position);
                    return indexA - indexB;
                });
                setResults(rankedResults);
            }
        } catch (error) {
            console.error("Error fetching results:", error);
        } finally {
            setLoading(false);
        }
    };


    const handleDownloadPDF = () => {
        const doc = new jsPDF("p", "mm", "a4");
        const pageWidth = doc.internal.pageSize.getWidth();
        const marginX = 14;
        let yPos = 25;

        // === HEADER ===
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.text("PCIU E-Voting - Modernizing Campus Elections", pageWidth / 2, yPos, { align: "center" });
        yPos += 8;
        doc.setFontSize(16);
        doc.text("3rd Executive Committee Election Results", pageWidth / 2, yPos, { align: "center" });

        yPos += 10;
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(`Generated on: ${new Date().toLocaleString()}`, marginX, yPos);

        yPos += 10;

        results.forEach((res, index) => {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(14);
            doc.text(`${index + 1}. ${res.position}`, marginX, yPos);
            yPos += 5;

            const tableData = res.winners.map((winner, i) => [
                i + 1,
                winner.candidate.name,
                winner.candidate.studentId,
                winner.totalVotes
            ]);

            autoTable(doc, {
                startY: yPos,
                head: [["#", "Candidate Name", "Student ID", "Total Votes"]],
                body: tableData,
                theme: "striped",
                headStyles: { fillColor: [42, 55, 147], halign: "center" },
                bodyStyles: { halign: "center" },
                margin: { left: marginX, right: marginX },
                didDrawPage: (data) => {
                    yPos = data.cursor.y + 10;
                },
            });

            yPos = doc.lastAutoTable.finalY + 10;
            if (yPos > doc.internal.pageSize.height - 30) {
                doc.addPage();
                yPos = 25;
            }
        });

        const footerText =
            "Software Generated Report. Designed & Developed by: Suprio Das, CSE 28A Day, Port City International University";
        doc.setFontSize(10);
        doc.setFont("helvetica", "italic");
        const pageHeight = doc.internal.pageSize.getHeight();
        doc.text(footerText, pageWidth / 2, pageHeight - 10, { align: "center" });
        doc.save("Election_Results.pdf");
    };


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600">Loading results...</p>
            </div>
        );
    }

    if (isVotingActive) {
        return null;
    }

    return (
        <div className="min-h-screen bg-base-200 p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-[#2a3793] mb-8">
                    🗳️ Election Results
                </h1>

                {results.length === 0 ? (
                    <p className="text-center text-gray-500">
                        No results available yet.
                    </p>
                ) : (
                    <>
                        <div className="grid gap-8">
                            {results.map((res, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white border border-[#2a3793] rounded-lg shadow-md p-5"
                                >
                                    <h2 className="text-xl font-semibold text-[#2a3793] mb-4 border-b pb-2">
                                        {res.position}
                                    </h2>

                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                                        {res.winners.map((winner, i) => (
                                            <div
                                                key={i}
                                                className="border rounded-lg p-4 flex flex-col items-center text-center hover:shadow-md"
                                            >
                                                <img
                                                    src={winner.candidate.photo}
                                                    alt={winner.candidate.name}
                                                    className="w-24 h-24 object-cover rounded-full border mb-3"
                                                />
                                                <img
                                                    src={winner.candidate.symbol}
                                                    alt="Symbol"
                                                    className="w-16 h-16 object-contain mb-2"
                                                />
                                                <h3 className="font-bold text-lg">
                                                    {winner.candidate.name}
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    {winner.candidate.studentId}
                                                </p>
                                                <p className="font-semibold mt-2 text-[#2a3793]">
                                                    🗳️ Votes: {winner.totalVotes}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="text-center mt-8">
                            <button
                                onClick={handleDownloadPDF}
                                className="btn bg-[#2a3793] text-white rounded-md w-64"
                            >
                                Download PDF
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ElectionResult;
