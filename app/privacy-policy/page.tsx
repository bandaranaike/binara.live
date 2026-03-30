export const metadata = {
    title: `Privacy Policy - ${process.env.NEXT_PUBLIC_APP_TITLE}`,
    description: "At Binara Medical Centre, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your personal information.",
};

const PrivacyPolicy = () => {
    return (
        <div className="page-wrap page-stack">
            <div className="section-stack">
                <section className="">
                    <div className="max-w-3xl">
                        <div className="section-kicker">Policy</div>
                        <h1 className="section-title mt-4">Privacy Policy</h1>
                        <p className="section-copy mt-4">How Binara Medical Centre collects, uses, and protects personal information shared through this website.</p>
                    </div>
                </section>
                <section className="section-surface-contrast">
                    <div className="prose prose-slate max-w-4xl">
                        <p><strong>Effective Date:</strong> 2025-01-01</p>

                        <h2 className="text-2xl font-semibold mt-4">1. Information We Collect</h2>
                        <p>We collect user details, including name, email, phone number, and age, solely for the purpose of medical appointment booking and communication with doctors.</p>

                        <h2 className="text-2xl font-semibold mt-4">2. How We Use Your Information</h2>
                        <p>Your personal information is used only for booking appointments and facilitating communication between patients and doctors. We do not use your data for marketing
                            purposes.</p>

                        <h2 className="text-2xl font-semibold mt-4">3. Data Security</h2>
                        <p>We take appropriate security measures to protect your personal data from unauthorized access or disclosure.</p>

                        <h2 className="text-2xl font-semibold mt-4">4. Third-Party Sharing</h2>
                        <p>We do not share your personal information with third parties except as required by law.</p>

                        <h2 className="text-2xl font-semibold mt-4">5. Your Rights</h2>
                        <p>You have the right to request access, correction, or deletion of your personal information. Please contact us for any such requests.</p>

                        <h2 className="text-2xl font-semibold mt-4">6. Changes to This Policy</h2>
                        <p>We may update this Privacy Policy from time to time. Continued use of our website constitutes acceptance of any changes.</p>

                        <p className="mt-4">If you have any questions, please contact us at <a className="hover:text-purple-600" href="mailto:info@binara.live">info@binara.live</a>.</p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
