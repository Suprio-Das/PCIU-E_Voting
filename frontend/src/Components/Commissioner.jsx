import { useState } from "react";
import Active from '../assets/active.png'
import Inactive from '../assets/inactive3.png'

const Commissioner = () => {
    const [activeSection, setActiveSection] = useState("election");

    return (
        <div className="flex min-h-[calc(100vh-100px)]">
            {/* Sidebar */}
            <div className="w-64 bg-base-200 p-4 border-r-2">
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
                            onClick={() => setActiveSection("voters")}
                            className={`hover:bg-base-300 rounded-lg ${activeSection === "voters" ? "bg-base-300 font-semibold" : ""
                                }`}
                        >
                            👥 Add Voters
                        </button>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center bg-base-100 p-6">
                {activeSection === "election" && (
                    <section className="text-center">
                        <h1 className="text-3xl font-semibold mb-4">Start/Stop Election</h1>
                        <p className="text-base-content flex justify-center items-center gap-2">
                            <span>Current Status: </span>
                            <span className="text-green-700 font-semibold flex items-center">Active <img src={Active} className="w-5"></img></span>
                        </p>
                    </section>
                )}

                {activeSection === "voters" && (
                    <section className="text-center">
                        <h1 className="text-3xl font-semibold mb-4">Add Voters</h1>
                        <p className="text-base-content">
                            This section contains the voter registration UI.
                        </p>
                    </section>
                )}
            </div>
        </div >
    );
};

export default Commissioner;
