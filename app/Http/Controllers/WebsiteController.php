<?php

namespace App\Http\Controllers;

use App\Models\StaticWebsiteDatum;
use Inertia\Inertia;

class WebsiteController extends Controller
{
    public function faq()
    {
        $locales = 'en';

        $data = StaticWebsiteDatum::where('locale', $locales)
            ->where('key', 'faq')
            ->firstOrFail();

        return Inertia::render('users/static/static-page', [
            'title' => 'FAQ',
            'content' => $data->value,
            'image' => [
                'src' => 'https://marketplace189.com/cdn/shop/files/man-sitting-in-city.jpg?v=1750609100&width=3840',
                'alt' => 'FAQ Image'
            ]
        ]);
    }

    public function payments()
    {
        $locales = 'en';

        $data = StaticWebsiteDatum::where('locale', $locales)
            ->where('key', 'payments')
            ->firstOrFail();

        return Inertia::render('users/static/static-page', [
            'title' => 'Payments',
            'content' => $data->value,
            'image' => [
                'src' => 'https://marketplace189.com/cdn/shop/files/man-sitting-in-city.jpg?v=1750609100&width=3840',
                'alt' => 'Payments Image'
            ]
        ]);
    }

    public function shipping()
    {
        $locales = 'en';

        $data = StaticWebsiteDatum::where('locale', $locales)
            ->where('key', 'shipping')
            ->firstOrFail();

        return Inertia::render('users/static/static-page', [
            'title' => 'Shipping, Returns & Cancellations',
            'content' => $data->value,
            'image' => [
                'src' => 'https://marketplace189.com/cdn/shop/files/man-sitting-in-city.jpg?v=1750609100&width=3840',
                'alt' => 'Shipping, Returns & Cancellations Image'
            ]
        ]);
    }

    public function returns()
    {
        $locales = 'en';

        $data = StaticWebsiteDatum::where('locale', $locales)
            ->where('key', 'shipping')
            ->firstOrFail();

        return Inertia::render('users/static/static-page', [
            'title' => 'Shipping, Returns & Cancellations',
            'content' => $data->value,
            'image' => [
                'src' => 'https://marketplace189.com/cdn/shop/files/man-sitting-in-city.jpg?v=1750609100&width=3840',
                'alt' => 'Shipping, Returns & Cancellations Image'
            ]
        ]);
    }

    public function cancellations()
    {
        $locales = 'en';

        $data = StaticWebsiteDatum::where('locale', $locales)
            ->where('key', 'shipping')
            ->firstOrFail();

        return Inertia::render('users/static/static-page', [
            'title' => 'Shipping, Returns & Cancellations',
            'content' => $data->value,
            'image' => [
                'src' => 'https://marketplace189.com/cdn/shop/files/man-sitting-in-city.jpg?v=1750609100&width=3840',
                'alt' => 'Shipping, Returns & Cancellations Image'
            ]
        ]);
    }

    public function contactUs()
    {
        $locales = 'en';

        $data = StaticWebsiteDatum::where('locale', $locales)
            ->where('key', 'contact-us')
            ->firstOrFail();

        return Inertia::render('users/static/static-page', [
            'title' => 'Contact Us',
            'content' => $data->value,
            'image' => [
                'src' => 'https://marketplace189.com/cdn/shop/files/man-sitting-in-city.jpg?v=1750609100&width=3840',
                'alt' => 'Contact Us Image'
            ]
        ]);
    }

    public function aboutUs()
    {
        $locales = 'en';

        $data = StaticWebsiteDatum::where('locale', $locales)
            ->where('key', 'about-us')
            ->firstOrFail();

        return Inertia::render('users/static/static-page', [
            'title' => 'About Us',
            'content' => $data->value,
            'image' => [
                'src' => 'https://marketplace189.com/cdn/shop/files/man-sitting-in-city.jpg?v=1750609100&width=3840',
                'alt' => 'About Us Image'
            ]
        ]);
    }

    public function privacyPolicy()
    {
        $locales = 'en';

        $data = StaticWebsiteDatum::where('locale', $locales)
            ->where('key', 'privacy-policy')
            ->firstOrFail();

        return Inertia::render('users/static/static-page', [
            'title' => 'Privacy Policy',
            'content' => $data->value,
            'image' => [
                'src' => 'https://marketplace189.com/cdn/shop/files/man-sitting-in-city.jpg?v=1750609100&width=3840',
                'alt' => 'Privacy Policy Image'
            ]
        ]);
    }

    public function cookiesPolicy()
    {
        $locales = 'en';

        $data = StaticWebsiteDatum::where('locale', $locales)
            ->where('key', 'cookie-policy')
            ->firstOrFail();

        return Inertia::render('users/static/static-page', [
            'title' => 'Cookie Policy',
            'content' => $data->value,
            'image' => [
                'src' => 'https://marketplace189.com/cdn/shop/files/man-sitting-in-city.jpg?v=1750609100&width=3840',
                'alt' => 'Cookie Policy Image'
            ]
        ]);
    }

}
