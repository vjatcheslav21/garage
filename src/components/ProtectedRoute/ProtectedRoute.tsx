import { useAppSelector } from "@/storage/hooks/hooks";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProp {
    children: ReactNode;
}

export const ProtectedRoute = ({children}: ProtectedRouteProp) => {

    const isAuth = useAppSelector(state => state.user.isAuth);

    if(!isAuth) {
        return <Navigate to='/login'/>
    }

    return children
}