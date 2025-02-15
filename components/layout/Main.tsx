import React, {useEffect} from "react";
import {useUserContext} from "@/context/UserContext";
import {setAxiosToken} from "@/lib/axios";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Main: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const {setUser, user, logout} = useUserContext()

    useEffect(() => {
        // Dynamically set token for Axios
        setAxiosToken(user?.token || null);
    }, [user]);
    return (
        <div>
            <Header/>
            {children}
            <Footer/>
        </div>
    )
};

export default Main;