import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "../Services/api";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const positionRanking = [
    "President",
    "Vice President",
    "General Secretary",
    "Joint Secretary",
    "Treasurer",
    "Organizing Secretary",
    "Event Secretary",
    "Publicity & Publication Secretary",
    "Information and Research Secretary",
    "Competitive Programming Secretary",
    "Sports and Cultural Secretary",
    "Women’s Affairs Secretary",
    "Executive Members",
];

const ElectionResult = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [summary, setSummary] = useState(null);
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
                fetchSummary();
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
                const rankedResults = res.data.ElectionResults.sort(
                    (a, b) =>
                        positionRanking.indexOf(a.position) -
                        positionRanking.indexOf(b.position)
                );
                setResults(rankedResults);
            }
        } catch (error) {
            console.error("Error fetching results:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSummary = async () => {
        try {
            const res = await api.get("api/commissioner/getvotesummary");
            if (res.data.success && res.data.voteSummary.length) {
                const { totalVoters, totalCastedVotes, totalPercentageFormatted } = res.data.voteSummary[0];
                setSummary({ totalVoters, totalCastedVotes, totalPercentageFormatted });
            }
        } catch (error) {
            console.error("Error fetching summary:", error);
        }
    };

    const handleDownloadPDF = () => {
        if (!results.length) return alert("No results available.");

        const filteredResults =
            selectedPosition === "All"
                ? results.slice().sort((a, b) => positionRanking.indexOf(a.position) - positionRanking.indexOf(b.position))
                : results.filter((res) => res.position === selectedPosition);

        const doc = new jsPDF("p", "mm", "a4");
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const marginX = 14;
        const topMargin = 50;
        const bottomMargin = 35;
        let yPos = topMargin + 5;

        const renderHeader = () => {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(18);
            doc.text("PCIU E-Voting - PCIU Computer Club 1st Election", pageWidth / 2, 18, { align: "center" });

            doc.setFontSize(16);
            doc.text("1st Executive Committee Election Results", pageWidth / 2, 26, { align: "center" });

            doc.setFont("helvetica", "italic");
            doc.setFontSize(9);
            doc.text(`Generated on: ${new Date().toLocaleString()}`, pageWidth / 2, 36, { align: "center" });

            if (summary) {
                doc.setFont("helvetica", "normal");
                doc.setFontSize(10);
                doc.text(
                    `Total Voters: ${summary.totalVoters}    |    Total Casted Votes: ${summary.totalCastedVotes}    |    Total Participation: ${summary.totalPercentageFormatted}%`,
                    pageWidth / 2,
                    44,
                    { align: "center" }
                );
            }
        };

        const renderFooter = (pageNumber, totalPages) => {
            const footerTop = pageHeight - 40;
            const colWidth = (pageWidth - 2 * marginX) / 3;

            const commissioners = [
                ["____________", "Sowmitra Das", "Assistant Election Commissioner,", "1st PCIU Computer Club Election"],
                ["______________", "Manoara Begum", "Assistant Election Commissioner,", "1st PCIU Computer Club Election"],
                ["_______________________", "Prof. Dr. Engr. Mafzal Ahmed", "Chief Election Commissioner,", "1st PCIU Computer Club Election"],
            ];

            let x = marginX;
            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);

            commissioners.forEach((info) => {
                const [sign, name, line1, line2] = info;
                const wrappedLine1 = doc.splitTextToSize(line1, colWidth - 4);
                const wrappedLine2 = doc.splitTextToSize(line2, colWidth - 4);

                doc.setFontSize(9);
                doc.text(sign, x, footerTop);
                doc.setFontSize(8.5);
                doc.text(name, x, footerTop + 5);
                doc.text(wrappedLine1, x, footerTop + 9);
                doc.text(wrappedLine2, x, footerTop + 13 + (wrappedLine1.length - 1) * 3);

                x += colWidth;
                doc.setFontSize(9);
            });

            doc.setDrawColor(180);
            doc.line(marginX, footerTop + 18, pageWidth - marginX, footerTop + 18);

            const devText = "Software Generated Report. Designed & Developed by: Suprio Das, CSE 28A Day, IT Secretary, PCIU Computer Club";
            doc.setFont("helvetica", "italic");
            doc.setFontSize(8.5);
            doc.text(devText, pageWidth / 2, footerTop + 24, { align: "center" });

            const copyrightText = "Copyright © 2025 - All right reserved to PCIU Computer Club, Port City International University";
            doc.text(copyrightText, pageWidth / 2, footerTop + 30, { align: "center" });

            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            doc.text(`Page ${pageNumber} of ${totalPages}`, pageWidth / 2, footerTop + 36, { align: "center" });
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

            const estimatedHeight = 10 + tableData.length * 8;
            if (yPos + estimatedHeight > pageHeight - bottomMargin - 20) {
                doc.addPage();
                yPos = topMargin + 5;
            }

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
                bodyStyles: { halign: "center", font: "helvetica", fontSize: 10.5 },
                margin: { top: topMargin + 5, bottom: bottomMargin, left: marginX, right: marginX },
                didParseCell: (data) => {
                    if (data.row.raw[4] === "Winner") {
                        data.cell.styles.fillColor = [180, 255, 180];
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
            renderHeader();
            renderFooter(p, totalPages);
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
                    Generate Election PDF
                </h1>
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
                            <option key={idx} value={pos}>{pos}</option>
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
        </div>
    );
};

export default ElectionResult;