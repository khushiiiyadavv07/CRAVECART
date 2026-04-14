import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = () => {
    const {authStatus} = useSelector((state) => state.user);

    if(authStatus === "loading") return null;

    if(authStatus === "authenticated") {
        return <Navigate to={"/"} />
    }

    return <Outlet/>
}

export default AuthRoute;