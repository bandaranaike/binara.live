import Login from "@/components/auth/Login";
import React from "react";

export const metadata = {
    title: "Login - " + process.env.NEXT_PUBLIC_APP_TITLE,
};

const LoginPage: React.FC = () => {
    return (<Login/>)
}

export default LoginPage;