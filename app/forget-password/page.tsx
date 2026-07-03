import {FC} from "react";
import ForgotPassword from "@/components/auth/ForgotPassword";
import {createPageMetadata, siteConfig} from "@/lib/site";

export const metadata = createPageMetadata({
    title: `Forgot Password | ${siteConfig.name}`,
    description: "Reset your patient account password securely.",
    path: "/forget-password",
    noindex: true,
});

const ForgetPasswordPage: FC = () => {
    return <div>
        <ForgotPassword/>
    </div>
}

export default ForgetPasswordPage;
