import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-200 lg:py-16">
            <div className="max-w-7xl mx-auto flex flex-wrap justify-between p-4 lg:p-0">
                <div className="p-4 lg:p-0">
                    <h3 className="text-2xl font-semibold">Contact Us</h3>
                    <p>Binara Medical Centre, No82. New Town, Kundasale</p>
                    <p>Phone: +94 817 213 239 / +94 812 421 942</p>
                    <p>Fax: +94 812 421 942 </p>
                    <p>Email: info@binara.live / binara82@gmail.com</p>
                </div>
                <div className="p-4 lg:p-0">
                    <h3 className="text-2xl font-semibold">Follow Us</h3>
                    <p>Facebook | Instagram | Twitter</p>
                </div>
                <div className="p-4 lg:p-0">
                    <h3 className="text-2xl font-semibold">Quick Links</h3>
                    <p>Book Appointment | Services | About Us</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;