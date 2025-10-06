import { useState } from "react";

const Commissioner = () => {
    const [activeSection, setActiveSection] = useState("election");

    return (
        <div className="flex min-h-screen">
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
            <div className="flex-1 p-6 bg-base-100">
                {activeSection === "election" && (
                    <section>
                        <h1 className="text-3xl font-semibold mb-4">Starting Election</h1>
                        <p className="text-base-content">
                            This section contains the election setup UI.
                        </p>
                    </section>
                )}

                {activeSection === "voters" && (
                    <section>
                        <h1 className="text-3xl font-semibold mb-4">Add Voters</h1>
                        <p className="text-base-content">
                            This section contains the voter registration UI.
                        </p>
                    </section>
                )}
            </div>
        </div>
    );
};

export default Commissioner;
