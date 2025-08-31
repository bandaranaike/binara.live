import AboutUsTimeline from "@/components/AboutUsTimeLine";
import ImageGallery from "@/components/ImageGallery";

export const metadata = {
    title: "About us - " + process.env.NEXT_PUBLIC_APP_TITLE,
};

export default function About() {

    const images = [
        '/images/about-us/1.jpg',
        '/images/about-us/2.jpg',
        '/images/about-us/3.jpg',
        '/images/about-us/4.jpg',
        '/images/about-us/5.jpg',
        '/images/about-us/6.jpg',
        '/images/about-us/7.jpg',
        '/images/about-us/8.jpg',
        '/images/about-us/9.jpg',
        '/images/about-us/10.jpg',
        '/images/about-us/11.jpg',
        '/images/about-us/14.jpg',
        '/images/about-us/15.jpg',
        '/images/about-us/16.jpg',
        '/images/about-us/17.jpg',
        '/images/about-us/18.jpg',
        '/images/about-us/19.jpg',
        '/images/about-us/20.jpg',
        '/images/about-us/21.jpg',
    ];

    return (
        <div className="bg-white max-w-7xl mx-auto lg:py-12 py-4 mt-8 px-4 lg:px-4">
            <h1 className="text-3xl font-extrabold text-center text-gray-900 sm:text-4xl">About Us</h1>
            <p className="text-gray-500 pt-6 lg:pt-10">Binara Medical Centre has been a
                trusted name in healthcare since 2008. Located in the heart of Kundasale, Kandy, we are
                dedicated to
                providing high-quality medical services to our community. Our team of experienced doctors and staff are committed to ensuring your well-being through
                personalized
                care and state-of-the-art facilities. Whether you need specialist consultations, OPD services, or dental care, we are here to serve you with compassion and
                expertise.</p>
            <AboutUsTimeline/>
            <div className="lg:pb-12 lg:pt-20 pt-16 py-6">
                <ImageGallery images={images}/></div>
        </div>
    );
}