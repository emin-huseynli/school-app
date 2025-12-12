import { useContext, type JSX } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

interface Props {
    children: JSX.Element
}


export const PrivateRoute = ({ children }: Props) => {
    const { user } = useContext(AuthContext)!

    if (!user) {
        return <Navigate to="/login" />
    }
    return children
}