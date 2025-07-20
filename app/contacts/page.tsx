"use client"
import ContactUs from "@/components/ContactUs";
import {useEffect, useRef, useState} from "react";
import debounce from "debounce";
import ContactMap from "@/components/ContactMap";

const Contacts = () => {
    const [iframeWidth, setIframeWidth] = useState<string | number>("100%");
    const iframeRef = useRef<HTMLIFrameElement>(null);
    useEffect(() => {
        const handleResize = () => {
            if (iframeRef.current) {
                setIframeWidth('100%');
            }
        };

        const debouncedResizeHandler = debounce(handleResize, 300);
        // Initial resize and event listener
        handleResize();  // Set the initial width
        window.addEventListener('resize', debouncedResizeHandler);

        return () => {
            window.removeEventListener('resize', debouncedResizeHandler);
        };
    }, []); // Empty dependency array ensures this runs only once on mount and unmount

    return (
        <div className="lg:px-8">
            <div className="bg-white max-w-7xl mx-auto py-12 px-4 lg:px-0">
                <h1 className="text-4xl mb-3 font-semibold">Contact us</h1>
                <p className="text-gray-600">Have questions or need assistance? We&#39;re here to help! Reach out to us via the form below or contact us directly. We’ll get back to
                    you as soon as possible</p>

                <div className="lg:grid lg:grid-cols-3 lg:gap-4 mt-12">
                    <div className="lg:col-span-2">
                        <ContactUs/>
                    </div>
                    <div>
                        <div className="mt-8 lg:mt-0 overflow-hidden rounded-lg border-gray-300 border content-center relative">
                            <div
                                className="border-gray-300 bottom-1/2 -mb-6 -mr-6 mt-6 right-1/2 h-12 w-12 animate-spin rounded-full border-2 border-t-purple-600 absolute z-10"></div>
                            <div className="z-20 relative">
                                <ContactMap iframeWidth={iframeWidth}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Contacts;