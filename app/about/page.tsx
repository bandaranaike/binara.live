import AboutUsTimeline from "@/components/AboutUsTimeLine";
import ImageGallery from "@/components/ImageGallery";

export const metadata = {
    title: "About us - " + process.env.NEXT_PUBLIC_APP_TITLE,
    description: "At Binara Medical Centre, we are dedicated to providing high-quality medical care tailored to your needs",
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
        <div className="page-wrap page-stack">
            <div className="section-stack">
                <section className="">
                    <div className="max-w-3xl">
                        <div className="section-kicker">About us</div>
                        <h1 className="section-title mt-4">Serving Kundasale with trusted care since 2008.</h1>
                        <p className="section-copy mt-4">
                            Binara Medical Centre has been a trusted name in healthcare since 2008. Located in the heart of Kundasale, Kandy, we are dedicated to providing high-quality medical services to our community.
                            Our team of experienced doctors and staff are committed to ensuring your well-being through personalized care and state-of-the-art facilities.
                        </p>
                    </div>
                </section>
                <section className="">
                    <div className="mb-6">
                        <div className="section-kicker">Gallery</div>
                        <h2 className="section-subtitle mt-4">A closer look at our centre</h2>
                    </div>
                    <ImageGallery images={images}/>
                </section>
                <section className="">
                    <AboutUsTimeline/>
                </section>
            </div>
        </div>
    );
}
