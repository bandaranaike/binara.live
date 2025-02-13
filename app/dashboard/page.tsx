"use client"
import React from "react";
import {useUserContext} from "@/context/UserContext";

const Dashboard: React.FC = () => {
    const {user} = useUserContext();
    return (
        <div className="p-4 lg:p-0">
            <h1>Dashboard </h1>
            {!user && <div className="text-yellow-500">Please login </div>}
        </div>
    )
}

export default Dashboard;