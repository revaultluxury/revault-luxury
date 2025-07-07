import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

export const useWebsiteData = () => {
    const { categories } = usePage<SharedData>().props;

    const topBanner = {
        text: 'Free International Shipping ⛟',
    };
    const aboutUs = {
        title: 'About Us',
        description: `<h1>About Us</h1>

    <div>
      <p>
        Welcome to <strong>ReVault</strong>, your trusted destination for authentic, pre-owned luxury timepieces and accessories.
      </p>

      <p>
        Founded with a passion for craftsmanship, heritage, and sustainability, we specialize in sourcing and curating
        <strong>genuine branded watches and high-quality accessories</strong> from around the world.
        Whether you're a seasoned collector or a first-time buyer, our goal is to provide you with timeless pieces that
        tell a story — without the premium price tag.
      </p>

      <h3>Why Choose Us?</h3>

      <ul>
        <li><strong>Authenticity Guaranteed</strong> – Every watch is inspected and verified by professionals.</li>
        <li><strong>Curated Selection</strong> – We only offer pieces that meet our strict standards for quality and design.</li>
        <li><strong>Sustainable Luxury</strong> – Buying pre-owned supports circular fashion and reduces environmental impact.</li>
        <li><strong>Customer First</strong> – From inquiry to aftercare, we’re here to provide a smooth, transparent experience.</li>
      </ul>

      <p>
        Our collection features top brands like
        <strong>Rolex, Omega, TAG Heuer, Seiko, Cartier, and more</strong>,
        along with select accessories that complement your style.
      </p>

      <h3>Our Mission</h3>

      <p>
        To make luxury more
        <strong>accessible</strong>,
        <strong>honest</strong>,
        and <strong>sustainable</strong> — one timepiece at a time.
      </p>

      <p>
        Thank you for being a part of our journey. We invite you to explore our collection and discover the watch that speaks to you.
      </p>
    </div>`,
        image: {
            src: '/images/about-us.jpg',
            alt: 'About Us Image',
        },
    };
    const navbarData = {
        logo: {
            url: 'https://revaultluxury.com',
            title: 'ReVault',
        },
        menu: [
            { title: 'Home', url: '/' },
            ...categories.map((category) => ({
                title: category.name,
                url: route('products.per-category', category.slug),
            })),
        ],
    };
    const footerData = {
        logo: {
            title: 'ReVault',
            url: 'https://revaultluxury.com',
        },
        menuItems: [
            {
                title: 'Menu',
                links: categories.map((category) => ({
                    text: category.name,
                    url: route('products.per-category', category.slug),
                })),
            },
            {
                title: 'Information',
                links: [
                    { text: 'FAQ', url: '#' },
                    { text: 'Payments', url: '#' },
                    { text: 'Shipping', url: '#' },
                    { text: 'Returns', url: '#' },
                    { text: 'Cancellations', url: '#' },
                ],
            },
            {
                title: 'Customer Care',
                links: [
                    { text: 'Contact Us', url: '#' },
                    { text: 'About Us', url: '#' },
                ],
            },
            {
                title: 'Policies',
                links: [
                    { text: 'Privacy Policy', url: '#' },
                    { text: 'Cookie Policy', url: '#' },
                ],
            },
        ],
        copyright: `© ${new Date().getFullYear()} Revault Luxury. All rights reserved.`,
        bottomLinks: [
            // { text: 'Privacy Policy', url: '#' },
            // { text: 'Cookie Policy', url: '#' },
        ],
    };

    return { navbarData, footerData, topBanner, aboutUs };
};
