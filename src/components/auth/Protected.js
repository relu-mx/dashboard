import { Navigate } from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../firebaseConfig";
import {CircularProgress} from "@mui/material";


const Protected = ({children }) => {

    const [user, loading, error] = useAuthState(auth);
    if (loading) {
        return <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
                <CircularProgress />
        </div>
    }
    
    if (error) {
        return <Navigate to={"/404"} />
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};
export default Protected;
