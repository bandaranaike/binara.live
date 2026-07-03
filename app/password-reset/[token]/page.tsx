import {FC} from "react";
import ResetPassword from "@/components/auth/ResetPassword";
import {createPageMetadata, siteConfig} from "@/lib/site";

export const metadata = createPageMetadata({
    title: `Reset Password | ${siteConfig.name}`,
    description: "Choose a new password for your patient account.",
    noindex: true,
});

const ResetPasswordPage: FC = () => {
    return <div>
        <ResetPassword/>
    </div>
}

export default ResetPasswordPage;
