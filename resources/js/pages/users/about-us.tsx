import { useWebsiteData } from '@/hooks/use-website-data';
import MainLayout from '@/layouts/custom/main-layout';
import { Head } from '@inertiajs/react';

const css = `
.about-section h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

.about-section h3 {
    font-size: 1.5rem;
    margin: 2rem 0 1rem;
}

.about-section p {
    margin-bottom: 1rem;
}

.about-section ul {
    list-style-type: none;
    margin-bottom: 1rem;
}

.about-section li {
    margin-bottom: 0.5rem;
}

.about-section strong {
    font-weight: bold;
}
`;

export default function AboutUs() {
    const { aboutUs } = useWebsiteData();
    return (
        <>
            <Head title="About Us">
                <style>{css}</style>
            </Head>
            <MainLayout>
                <img
                    src={'https://marketplace189.com/cdn/shop/files/man-sitting-in-city.jpg?v=1750609100&width=3840'}
                    alt={aboutUs.image.alt}
                    className="h-96 w-full object-cover"
                />
                <section className="about-section container mx-auto p-4 px-16" dangerouslySetInnerHTML={{ __html: aboutUs.description }}></section>
            </MainLayout>
        </>
    );
}
