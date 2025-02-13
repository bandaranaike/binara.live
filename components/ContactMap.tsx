import React, {useEffect, useState} from 'react';
import Loader from "@/components/Loader";

const ContactMap: React.FC<{ iframeWidth: string | number }> = ({iframeWidth}) => {
    const [mapLoaded, setMapLoaded] = useState(false);
    const [mapUrl, setMapUrl] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Construct your iframe URL here (if needed)
            const url = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4735.774563238796!2d80.68337987499989!3d7.281281692725976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae366f2494616bd%3A0x288e608f04113d41!2sBinara%20Medical%20Centre!5e1!3m2!1sen!2slk!4v1739011920966!5m2!1sen!2slk`; // Or whatever your URL structure is
            setMapUrl(url);
            setMapLoaded(true);
        }
    }, []);

    return (
        <div>
            {mapLoaded && (
                <iframe
                    src={mapUrl}
                    width={iframeWidth}
                    height="450"
                    style={{border: 0}}
                    loading="lazy"
                ></iframe>
            )}
            {!mapLoaded && <Loader/>}
        </div>
    );
};

export default ContactMap;