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
        <div className="page-wrap page-stack">
            <div className="section-stack">
                <section className="">
                    <div className="max-w-3xl">
                        <div className="section-kicker">Contact us</div>
                        <h1 className="section-title mt-4">Talk to our team and plan your next visit.</h1>
                        <p className="section-copy mt-4">Have questions or need assistance? Reach out through the form below or contact us directly. We’ll get back to you as soon as possible.</p>
                    </div>
                </section>
                <section className="">
                    <div className="lg:grid lg:grid-cols-3 lg:gap-6">
                    <div className="lg:col-span-2">
                        <ContactUs/>
                    </div>
                    <div>
                        <div className="content-panel mt-8 lg:mt-0 overflow-hidden content-center relative !p-0">
                            <div className="absolute bottom-1/2 right-1/2 z-10 -mb-6 -mr-6 mt-6 h-12 w-12 animate-spin rounded-full border-2 border-gray-300 border-t-purple-600"></div>
                            <div className="z-20 relative">
                                <ContactMap iframeWidth={iframeWidth}/>
                            </div>
                        </div>
                    </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
export default Contacts;
