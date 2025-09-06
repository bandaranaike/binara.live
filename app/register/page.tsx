import Register from "@/components/auth/Register";
import React from "react";

export const metadata = {
    title: "Register - " + process.env.NEXT_PUBLIC_APP_TITLE,
    description: "At Binara Medical Centre, we are dedicated to providing high-quality medical care tailored to your needs",
};
const RegisterPage: React.FC = () => {
    return (<Register/>)
}

export default RegisterPage;