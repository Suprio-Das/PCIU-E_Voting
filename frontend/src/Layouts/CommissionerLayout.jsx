import { useSelector } from "react-redux";
import Commissioner from "../Components/Commissioner";
import { Navigate } from "react-router";

const CommissionerLayout = () => {
    const user = useSelector((state) => state.Auth.user);
    if (!user) {
        return <Navigate to='/'></Navigate>;
    }
    if (user.role !== 'commissioner') {
        return <Navigate to='/'></Navigate>;
    }
    return (
        <div>
            <Commissioner></Commissioner>
        </div>
    );
};

export default CommissionerLayout;