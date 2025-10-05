import { useSelector } from "react-redux";
import Commissioner from "../Components/Commissioner";
import { Navigate, Outlet } from "react-router";

const CommissionerLayout = () => {
    const user = useSelector((state) => state.Auth.user);
    if (!user) {
        return <Navigate to='/'></Navigate>;
    }
    if (user.role !== 'commissioner') {
        return <Navigate to='/'></Navigate>;
    }
    return (
        <Outlet></Outlet>
    );
};

export default CommissionerLayout;