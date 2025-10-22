import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "../Services/api";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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
    const [selectedPosition, setSelectedPosition] = useState("All");
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

    // const handleDownloadPDF = () => {
    //     if (!results.length) return alert("No results available.");

    //     const filteredResults =
    //         selectedPosition === "All"
    //             ? results
    //             : results.filter((res) => res.position === selectedPosition);

    //     const doc = new jsPDF("p", "mm", "a4");
    //     const pageWidth = doc.internal.pageSize.getWidth();
    //     const marginX = 14;
    //     let yPos = 25;

    //     // === HEADER ===
    //     doc.setFont("helvetica", "bold");
    //     doc.setFontSize(18);
    //     doc.text("PCIU E-Voting - Modernizing Campus Elections", pageWidth / 2, yPos, {
    //         align: "center",
    //     });
    //     yPos += 8;
    //     doc.setFontSize(16);
    //     doc.text("3rd Executive Committee Election Results", pageWidth / 2, yPos, {
    //         align: "center",
    //     });

    //     yPos += 10;
    //     doc.setFontSize(12);
    //     doc.setFont("helvetica", "normal");
    //     doc.text(`Generated on: ${new Date().toLocaleString()}`, marginX, yPos);
    //     yPos += 10;

    //     filteredResults.forEach((res, index) => {
    //         // Sort candidates by votes descending
    //         const sortedCandidates = res.candidates.sort(
    //             (a, b) => b.totalVotes - a.totalVotes
    //         );

    //         const maxVotes = Math.max(...sortedCandidates.map((c) => c.totalVotes));

    //         doc.setFont("helvetica", "bold");
    //         doc.setFontSize(14);
    //         doc.text(`${index + 1}. ${res.position}`, marginX, yPos);
    //         yPos += 5;

    //         const tableData = sortedCandidates.map((c, i) => [
    //             i + 1,
    //             c.name,
    //             c.studentId,
    //             c.totalVotes,
    //             c.totalVotes === maxVotes ? "🏆 Winner" : "",
    //         ]);

    //         autoTable(doc, {
    //             startY: yPos,
    //             head: [["#", "Candidate Name", "Student ID", "Total Votes", "Status"]],
    //             body: tableData,
    //             theme: "grid",
    //             headStyles: { fillColor: [42, 55, 147], halign: "center" },
    //             bodyStyles: {
    //                 halign: "center",
    //             },
    //             didParseCell: (data) => {
    //                 // Highlight winner row
    //                 if (data.row.raw[4] === "🏆 Winner") {
    //                     data.cell.styles.fillColor = [200, 230, 255];
    //                     data.cell.styles.fontStyle = "bold";
    //                 }
    //             },
    //             margin: { left: marginX, right: marginX },
    //             didDrawPage: (data) => {
    //                 yPos = data.cursor.y + 10;
    //             },
    //         });

    //         yPos = doc.lastAutoTable.finalY + 10;
    //         if (yPos > doc.internal.pageSize.height - 30) {
    //             doc.addPage();
    //             yPos = 25;
    //         }
    //     });

    //     // Footer
    //     const footerText =
    //         "Software Generated Report. Designed & Developed by: Suprio Das, CSE 28A Day, Port City International University";
    //     doc.setFontSize(10);
    //     doc.setFont("helvetica", "italic");
    //     const pageHeight = doc.internal.pageSize.getHeight();
    //     doc.text(footerText, pageWidth / 2, pageHeight - 10, { align: "center" });

    //     const filename =
    //         selectedPosition === "All"
    //             ? "Election_Results_All_Positions.pdf"
    //             : `Election_Result_${selectedPosition.replace(/\s+/g, "_")}.pdf`;

    //     doc.save(filename);
    // };
    const handleDownloadPDF = () => {
        if (!results.length) return alert("No results available.");

        const filteredResults =
            selectedPosition === "All"
                ? results
                : results.filter((res) => res.position === selectedPosition);

        const doc = new jsPDF("p", "mm", "a4");
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const marginX = 14;
        const topMargin = 50; // reserved space for header
        const bottomMargin = 20; // reserved space for footer
        let yPos = topMargin + 5;

        // header renderer (drawn later on each page)
        const renderHeader = (doc) => {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(18);
            doc.text("PCIU E-Voting - PCIU Computer Club 1st Election", pageWidth / 2, 18, { align: "center" });
            doc.setFontSize(16);
            doc.text("3rd Executive Committee Election Results", pageWidth / 2, 26, { align: "center" });
            doc.setFont("helvetica", "normal");
            doc.setFontSize(10.5);
            doc.text(`Generated on: ${new Date().toLocaleString()}`, marginX, 34);
        };

        // footer renderer (drawn later on each page)
        // const renderFooter = (doc, pageNumber, totalPages) => {
        //     const footerY = pageHeight - 20;
        //     doc.text()
        //     doc.setFontSize(8.5);
        //     doc.setFont("helvetica", "italic");
        //     doc.text(
        //         "Software Generated Report. Designed & Developed by: Suprio Das, CSE 28A Day, Port City International University",
        //         marginX,
        //         footerY,
        //         { align: "left" }
        //     );
        //     doc.text()
        //     doc.setFontSize(8.5);
        //     doc.setFont("helvetica", "italic");
        //     doc.text(
        //         "Software Generated Report. Designed & Developed by: Suprio Das, CSE 28A Day, Port City International University",
        //         marginX,
        //         footerY,
        //         { align: "left" }
        //     );
        //     doc.setFont("helvetica", "normal");
        //     doc.setFontSize(9);
        //     doc.text(`Page ${pageNumber} of ${totalPages}`, pageWidth - marginX, footerY, { align: "right" });
        // };

        const renderFooter = (doc, pageNumber, totalPages) => {
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const marginX = 14;
            const footerTop = pageHeight - 65; // top of footer block
            const colWidth = (pageWidth - 2 * marginX) / 3; // 3 equal columns

            // Row 1: Commissioners' Info
            const commissioners = [
                [
                    "Sowmitra Das",
                    "Assistant Election Commissioner,",
                    "1st PCIU Computer Club Election",
                    "and",
                    "Assitant Professor,",
                    "Dept.of CSE, PCIU",
                ],
                [
                    "Manoara Begum",
                    "Assistant Election Commissioner,",
                    "1st PCIU Computer Club Election",
                    "and",
                    "Chairman,",
                    "Dept.of CSE, PCIU",
                ],
                [
                    "Prof. Dr. Engr. Mafzal Ahmed",
                    "Chief Election Commissioner,",
                    "1st PCIU Computer Club Election",
                    "and",
                    "Dean,",
                    "Faculty of Science and Engineering, PCIU",
                ],
            ];

            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            let x = marginX;
            let y = footerTop;

            commissioners.forEach((info) => {
                const [name, line1, line2] = info;
                doc.text(name, x, y);
                doc.setFontSize(8.2);
                doc.text(line1, x, y + 4);
                doc.text(line2, x, y + 8);
                x += colWidth; // move to next column
                doc.setFontSize(9);
            });

            // Divider line above the merged rows
            doc.setDrawColor(180);
            doc.line(marginX, footerTop + 12, pageWidth - marginX, footerTop + 12);

            // Row 2: Developer Info (merged columns)
            const devText =
                "Software Generated Report. Designed & Developed by: Suprio Das, CSE 28A Day, Port City International University";
            doc.setFont("helvetica", "italic");
            doc.setFontSize(8.5);
            doc.text(devText, pageWidth / 2, footerTop + 18, { align: "center" });

            // Row 3: Copyright (merged columns)
            const copyrightText =
                "Copyright © 2025 - All right reserved to Computer Club, Port City International University";
            doc.text(copyrightText, pageWidth / 2, footerTop + 24, { align: "center" });

            // Row 4: Page Number (merged columns)
            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            doc.text(`Page ${pageNumber} of ${totalPages}`, pageWidth / 2, footerTop + 30, { align: "center" });
        };

        filteredResults.forEach((res, index) => {
            const sortedCandidates = res.candidates.sort((a, b) => b.totalVotes - a.totalVotes);
            const maxVotes = Math.max(...sortedCandidates.map((c) => c.totalVotes));

            const tableData = sortedCandidates.map((c, i) => [
                i + 1,
                c.name,
                c.studentId,
                c.totalVotes,
                c.totalVotes === maxVotes ? "Winner" : "",
            ]);

            // Add a title before the table (start below reserved header area)
            doc.setFont("helvetica", "bold");
            doc.setFontSize(13.5);
            doc.text(`${index + 1}. ${res.position}`, marginX, yPos);
            yPos += 6;

            autoTable(doc, {
                startY: yPos,
                head: [["#", "Candidate Name", "Student ID", "Total Votes", "Status"]],
                body: tableData,
                theme: "grid",
                headStyles: { fillColor: [42, 55, 147], halign: "center", textColor: 255 },
                bodyStyles: {
                    halign: "center",
                    font: "helvetica",
                    fontSize: 10.5,
                },
                margin: { top: topMargin + 5, bottom: bottomMargin, left: marginX, right: marginX },
                didParseCell: (data) => {
                    if (data.row.raw[4] === "Winner") {
                        data.cell.styles.fillColor = [180, 255, 180]; // light green highlight
                        data.cell.styles.textColor = [0, 64, 0];
                        data.cell.styles.fontStyle = "bold";
                    }
                },
                didDrawPage: () => {
                    yPos = doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : topMargin + 10;
                },
            });

            yPos = doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : topMargin + 10;
        });

        const totalPages = doc.internal.getNumberOfPages();
        for (let p = 1; p <= totalPages; p++) {
            doc.setPage(p);
            renderHeader(doc);
            renderFooter(doc, p, totalPages);
        }

        const filename =
            selectedPosition === "All"
                ? "Election_Results_All_Positions.pdf"
                : `Election_Result_${selectedPosition.replace(/\s+/g, "_")}.pdf`;

        doc.save(filename);
    };


    if (loading)
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600">Loading results...</p>
            </div>
        );

    if (isVotingActive) return null;

    return (
        <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center p-6">
            <div className="bg-white shadow-md border border-[#2a3793] rounded-lg p-8 w-full max-w-md text-center">
                <h1 className="text-2xl font-bold text-[#2a3793] mb-6">
                    Generate Election Reports
                </h1>
                {
                    results.length === 0 ? 'No result is found!' :
                        <div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Select Position
                                </label>
                                <select
                                    className="select select-bordered w-full"
                                    value={selectedPosition}
                                    onChange={(e) => setSelectedPosition(e.target.value)}
                                >
                                    <option value="All">All Positions</option>
                                    {positionRanking.map((pos, idx) => (
                                        <option key={idx} value={pos}>
                                            {pos}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button
                                onClick={handleDownloadPDF}
                                className="btn bg-[#2a3793] text-white w-full rounded-md"
                            >
                                Download PDF
                            </button>
                        </div>
                }
            </div>
        </div>
    );
};

export default ElectionResult;
