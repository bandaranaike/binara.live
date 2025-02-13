import React from "react";

const PrivacyPolicy = () => {
    return (
        <div className="max-w-7xl mx-auto p-6 bg-white my-10">
            <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
            <p><strong>Effective Date:</strong> [Insert Date]</p>

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
    );
};

export default PrivacyPolicy;