import Register from "@/components/auth/Register";
import React from "react";

export const metadata = {
    title: "Register - " + process.env.NEXT_PUBLIC_APP_TITLE,
};
const RegisterPage: React.FC = () => {
    return (<Register/>)
}

export default RegisterPage;