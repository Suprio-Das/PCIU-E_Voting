import { useEffect, useState } from "react";
import Active from '../assets/active.png'
import Inactive from '../assets/inactive3.png'
import api from "../Services/api";
import AddCandidates from "./AddCandidates";
import AddPositions from "./AddPositions";
import AddVoters from "./AddVoters";
import ElectionResult from "./ElectionResults";
import AllowVoters from "./AllowVoters";

const Commissioner = () => {
    const [activeSection, setActiveSection] = useState("election");
    const [stats, setStats] = useState();
    const [positions, setPositions] = useState();
    const [candidates, setCandidates] = useState();
    const [voters, setVoters] = useState();
    const [refresh, setRefresh] = useState(false);

    const handleStart = async () => {
        try {
            const res = await api.post("api/commissioner/createvote");
            if (res) {
                setStats(true)
                setRefresh((prev) => !prev)
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    const handleStop = async () => {
        try {
            const res = await api.post("api/commissioner/stopvote");
            if (res) {
                setStats(false)
                setRefresh((prev) => !prev)
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get("api/votestats/stats");
                setStats(res.data);
                console.log("Vote stats:", res.data);
            } catch (error) {
                console.error("Error fetching vote stats:", error);
            }
        };
        const fetchPositions = async () => {
            try {
                const res = await api.get("api/commissioner/positions");
                setPositions(res.data.data);
                console.log("Positions", res.data.data);
            } catch (error) {
                console.error("Error fetching positions:", error);
            }
        };
        const fetchCandidates = async () => {
            try {
                const res = await api.get("api/vote/getcandidatewithposition");
                setCandidates(res.data.data);
                console.log("Candidates", res.data.data);
            } catch (error) {
                console.error("Error fetching candidates:", error);
            }
        };

        const fetchVoters = async () => {
            try {
                const res = await api.get('api/vote/getvoters');
                if (res) {
                    setVoters(res.data.data);
                    console.log(res.data.data);
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchStats();
        fetchPositions();
        fetchCandidates();
        fetchVoters();
    }, [refresh]);


    return (
        <div className="flex min-h-[calc(100vh-100px)]">
            {/* Sidebar */}
            <div className="w-64 bg-base-200 p-4 border-r-2 border-[#2a3793]">
                <h2 className="text-2xl font-bold mb-6 text-center">Commissioner Panel</h2>
                <ul className="menu">
                    <li>
                        <button
                            onClick={() => setActiveSection("election")}
                            className={`hover:bg-base-300 rounded-lg ${activeSection === "election" ? "bg-base-300 font-semibold" : ""
                                }`}
                        >
                            🗳️ Start Election
                        </button>
                    </li>
                    <li>
                        <button
                            disabled={stats === false}
                            onClick={() => setActiveSection("allowVoters")}
                            className={`hover:bg-base-300 rounded-lg ${activeSection === "allowVoters" ? "bg-base-300 font-semibold" : ""
                                } ${stats === false ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            👥 Allow Voters
                        </button>
                    </li>
                    <li>
                        <button
                            disabled={stats === true}
                            onClick={() => setActiveSection("voters")}
                            className={`hover:bg-base-300 rounded-lg ${activeSection === "voters" ? "bg-base-300 font-semibold" : ""
                                } ${stats === true ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            👥 Add Voters
                        </button>
                    </li>
                    <li>
                        <button
                            disabled={stats === true}
                            onClick={() => setActiveSection("positions")}
                            className={`hover:bg-base-300 rounded-lg ${activeSection === "positions" ? "bg-base-300 font-semibold" : ""
                                } ${stats === true ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            📝 Add Positions
                        </button>
                    </li>
                    <li>
                        <button
                            disabled={stats === true}
                            onClick={() => setActiveSection("candidates")}
                            className={`hover:bg-base-300 rounded-lg  ${activeSection === "candidates" ? "bg-base-300 font-semibold" : ""
                                } ${stats === true ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            👥 Add Candidates
                        </button>
                    </li>
                    <li>
                        <button
                            disabled={stats === true}
                            onClick={() => setActiveSection("results")}
                            className={`hover:bg-base-300 rounded-lg  ${activeSection === "candidates" ? "bg-base-300 font-semibold" : ""
                                } ${stats === true ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            Export Results
                        </button>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center bg-base-100 p-6">
                {activeSection === "election" && (
                    <section className="text-center">
                        {
                            positions?.length !== 0 && candidates?.length !== 0 && voters?.length !== 0 ?
                                <div>
                                    <h1 className="text-3xl font-semibold mb-4">Start/Stop Election</h1>
                                    <p className="text-base-content flex justify-center items-center gap-2">
                                        <span>Current Status: </span>
                                        {stats === true ? <span className="text-green-700 font-semibold flex items-center">Active <img src={Active} className="w-5"></img></span> :
                                            <span className="text-red-700 font-semibold flex items-center">Inactive <img src={Inactive} className="w-5"></img></span>}
                                    </p>
                                    {stats === true ? <button onClick={handleStop} className="btn bg-[#2a3793] text-white my-3">Stop Election</button> : <button onClick={handleStart} className="btn bg-[#2a3793] text-white my-3">Start Election</button>}
                                </div> : <h1 className="text-center shadow-lg border-1 border-[#2a3793] rounded-xl py-4 px-2">Please add Positions, Voter and Candidates first. </h1>
                        }
                    </section>
                )}

                {activeSection === "allowVoters" && (
                    <section className="text-center">
                        <AllowVoters></AllowVoters>
                    </section>
                )}
                {activeSection === "voters" && (
                    <section className="text-center">
                        {/* <h1 className="text-3xl font-semibold mb-4">Add Voters</h1>
                        <p className="text-base-content">
                            This section contains the voter registration UI.
                        </p> */}
                        <AddVoters></AddVoters>
                    </section>
                )}
                {activeSection === "candidates" && (
                    <section className="w-4/5 shadow-lg border-1 border-[#2a3793] rounded-xl py-4">
                        {positions?.length !== 0 ? <AddCandidates setRefresh={setRefresh} positions={positions}></AddCandidates> : <h1 className="text-center">No position found. <span className="text-red-700 font-semibold">(You must add positions first).</span></h1>}
                    </section>
                )}
                {activeSection === "positions" && (
                    <section className="w-4/5 shadow-lg border-1 border-[#2a3793] rounded-xl py-4">
                        <AddPositions setRefresh={setRefresh}></AddPositions>
                    </section>
                )}
                {activeSection === "results" && (
                    <section className="w-4/5 shadow-lg border-1 border-[#2a3793] rounded-xl">
                        <ElectionResult></ElectionResult>
                    </section>
                )}
            </div>
        </div >
    );
};

export default Commissioner;
