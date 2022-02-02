import React from "react";

import { Outlet, Navigate } from "react-router-dom";
import MainNavbar from "./navigation_components/MainNavbar";


const ProtectedRoutes = () => {

    return (localStorage.getItem('access_token')) ?
    <MainNavbar>
        <Outlet/>
    </MainNavbar>
    : <Navigate to='/'/>
}

export default ProtectedRoutes