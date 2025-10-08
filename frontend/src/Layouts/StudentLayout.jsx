import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import api from "../Services/api";

const StudentLayout = () => {
    const [stats, setStats] = useState();
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get("api/votestats/stats");
                setStats(res.data);
                console.log("Vote stats:", res.data);
            } catch (error) {
                console.error("Error fetching vote stats:", error);
            }
        }
        fetchStats();
    }, []);
    const user = useSelector((state) => state.Auth.user);
    if (user && user?.role === 'commissioner') {
        return <Navigate to='/commissioner'></Navigate>;
    }
    return (
        <>
            {
                stats === true ? <Outlet></Outlet> : <div className="min-h-[calc(100vh-170px)] flex justify-center items-center">
                    <h1 className="text-2xl font-semibold primary-color">Sorry, Election is not running or ended.</h1>
                </div>
            }
        </>
    );
};

export default StudentLayout;