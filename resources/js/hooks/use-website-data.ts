import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

export const useWebsiteData = () => {
    const { categories } = usePage<SharedData>().props;

    const topBanner = {
        text: 'Free International Shipping ⛟',
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
            url: route('index'),
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
                    { text: 'FAQ', url: route('pages.faq') },
                    { text: 'Payments', url: route('pages.payments') },
                    { text: 'Shipping', url: route('pages.shipping') },
                    { text: 'Returns', url: route('pages.returns') },
                    { text: 'Cancellations', url: route('pages.cancellations') },
                ],
            },
            {
                title: 'Customer Care',
                links: [
                    { text: 'Contact Us', url: route('pages.contact-us') },
                    { text: 'About Us', url: route('pages.about-us') },
                ],
            },
            {
                title: 'Policies',
                links: [
                    { text: 'Privacy Policy', url: route('pages.privacy-policy') },
                    { text: 'Cookie Policy', url: route('pages.cookies-policy') },
                ],
            },
        ],
        copyright: `© ${new Date().getFullYear()} Revault Luxury. All rights reserved.`,
        bottomLinks: [
            // { text: 'Privacy Policy', url: '#' },
            // { text: 'Cookie Policy', url: '#' },
        ],
    };

    return { navbarData, footerData, topBanner };
};
