"use client"
const Contacts = () => {
    return (
        <div className="bg-white max-w-7xl mx-auto py-12 px-4 lg:px-0">
            <h1 className="text-4xl font-semibold">Contact us</h1>
            <div className="mt-8 overflow-hidden">

                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4735.774563238796!2d80.68337987499989!3d7.281281692725976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae366f2494616bd%3A0x288e608f04113d41!2sBinara%20Medical%20Centre!5e1!3m2!1sen!2slk!4v1739011920966!5m2!1sen!2slk"
                    width="1280" height="450" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    )
}
export default Contacts;