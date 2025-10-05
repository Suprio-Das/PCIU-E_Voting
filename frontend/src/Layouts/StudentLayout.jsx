import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const StudentLayout = () => {
    const user = useSelector((state) => state.Auth.user);
    if (user && user?.role === 'commissioner') {
        return <Navigate to='/commissioner'></Navigate>;
    }
    return (
        <Outlet></Outlet>
    );
};

export default StudentLayout;