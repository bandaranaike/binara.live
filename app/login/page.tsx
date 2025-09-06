import Login from "@/components/auth/Login";
import React from "react";

export const metadata = {
    title: "Login - " + process.env.NEXT_PUBLIC_APP_TITLE,
    description: "At Binara Medical Centre, we are dedicated to providing high-quality medical care tailored to your needs",
};

const LoginPage: React.FC = () => {
    return (<Login/>)
}

export default LoginPage;