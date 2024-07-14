import {Navigate} from "react-router-dom";
import { useAuthStore } from "../store/auth";

const PrivateRoute=({children})=>{
    const LoggedIn=useAuthStore((state)=>state.isLoggedIn)();
    return LoggedIn ? <>{children}</> : <Navigate to="/login/"/>;
};

export default PrivateRoute;