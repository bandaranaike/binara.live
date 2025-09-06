export const metadata = {
    title: "Cookie Policy - " + process.env.NEXT_PUBLIC_APP_TITLE,
    description: "At Binara Medical Centre, we are committed to protecting your privacy. This Cookie Policy explains how we use cookies to enhance your browsing experience.",
};

const CookiePolicy = () => {
    return (
        <div className="max-w-7xl mx-auto p-6 bg-white my-10">
            <h1 className="text-3xl font-bold mb-8">Cookie Policy</h1>
            <p><strong>Effective Date:</strong> 2025-01-01</p>

            <h2 className="text-2xl font-semibold mt-4">1. What Are Cookies?</h2>
            <p>Cookies are small text files stored on your device to enhance your browsing experience and provide website functionality.</p>

            <h2 className="text-2xl font-semibold mt-4">2. How We Use Cookies</h2>
            <p>We use cookies to improve website performance, remember user preferences, and analyze site usage.</p>

            <h2 className="text-2xl font-semibold mt-4">3. Types of Cookies We Use</h2>
            <ul className="list-disc pl-6">
                <li><strong>Essential Cookies:</strong> Necessary for website functionality.</li>
                <li><strong>Analytical Cookies:</strong> Help us understand user behavior to improve our services.</li>
                <li><strong>Functional Cookies:</strong> Store user preferences for a better experience.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-4">4. Managing Cookies</h2>
            <p>You can manage or disable cookies through your browser settings. Disabling cookies may affect website functionality.</p>

            <h2 className="text-2xl font-semibold mt-4">5. Changes to This Policy</h2>
            <p>We may update this Cookie Policy from time to time. Continued use of our website constitutes acceptance of any changes.</p>

            <p className="mt-4">If you have any questions, please contact us at <a className="hover:text-purple-600" href="mailto:info@binara.live">info@binara.live</a>.</p>
        </div>
    );
};

export default CookiePolicy;
