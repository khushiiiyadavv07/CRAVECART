import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
    const {authStatus } = useSelector((state) => state.user);

    if(authStatus === "loading") return null;

    if(authStatus === "unauthenticated") {
        return <Navigate to={"/signin"} />;
    }
    return <Outlet/>;
}

export default ProtectedRoute;