<?php

namespace App\Http\Controllers;

use App\Models\StaticWebsiteDatum;
use Inertia\Inertia;

class WebsiteController extends Controller
{
    public function faq()
    {
        $locales = app()->getLocale();

        $data = StaticWebsiteDatum::where('locale', $locales)
            ->where('key', 'faq')
            ->firstOrFail();

        return Inertia::render('users/static/static-page', [
            'title' => 'FAQ',
            'content' => $data->value,
            'image' => [
                'src' => 'https://fls-9f56b3e7-34dc-42a4-9adf-f70180fad897.laravel.cloud/banner/banner-1.webp',
                'alt' => 'FAQ Image'
            ]
        ]);
    }

    public function payments()
    {
        $locales = app()->getLocale();

        $data = StaticWebsiteDatum::where('locale', $locales)
            ->where('key', 'payments')
            ->firstOrFail();

        return Inertia::render('users/static/static-page', [
            'title' => 'Payments',
            'content' => $data->value,
            'image' => [
                'src' => 'https://fls-9f56b3e7-34dc-42a4-9adf-f70180fad897.laravel.cloud/banner/banner-1.webp',
                'alt' => 'Payments Image'
            ]
        ]);
    }

    public function shipping()
    {
        $locales = app()->getLocale();

        $data = StaticWebsiteDatum::where('locale', $locales)
            ->where('key', 'shipping')
            ->firstOrFail();

        return Inertia::render('users/static/static-page', [
            'title' => 'Shipping, Returns & Cancellations',
            'content' => $data->value,
            'image' => [
                'src' => 'https://fls-9f56b3e7-34dc-42a4-9adf-f70180fad897.laravel.cloud/banner/banner-1.webp',
                'alt' => 'Shipping, Returns & Cancellations Image'
            ]
        ]);
    }

    public function returns()
    {
        $locales = app()->getLocale();

        $data = StaticWebsiteDatum::where('locale', $locales)
            ->where('key', 'shipping')
            ->firstOrFail();

        return Inertia::render('users/static/static-page', [
            'title' => 'Shipping, Returns & Cancellations',
            'content' => $data->value,
            'image' => [
                'src' => 'https://fls-9f56b3e7-34dc-42a4-9adf-f70180fad897.laravel.cloud/banner/banner-1.webp',
                'alt' => 'Shipping, Returns & Cancellations Image'
            ]
        ]);
    }

    public function cancellations()
    {
        $locales = app()->getLocale();

        $data = StaticWebsiteDatum::where('locale', $locales)
            ->where('key', 'shipping')
            ->firstOrFail();

        return Inertia::render('users/static/static-page', [
            'title' => 'Shipping, Returns & Cancellations',
            'content' => $data->value,
            'image' => [
                'src' => 'https://fls-9f56b3e7-34dc-42a4-9adf-f70180fad897.laravel.cloud/banner/banner-1.webp',
                'alt' => 'Shipping, Returns & Cancellations Image'
            ]
        ]);
    }

    public function contactUs()
    {
        $locales = app()->getLocale();

        $data = StaticWebsiteDatum::where('locale', $locales)
            ->where('key', 'contact-us')
            ->firstOrFail();

        return Inertia::render('users/static/static-page', [
            'title' => 'Contact Us',
            'content' => $data->value,
            'image' => [
                'src' => 'https://fls-9f56b3e7-34dc-42a4-9adf-f70180fad897.laravel.cloud/banner/banner-1.webp',
                'alt' => 'Contact Us Image'
            ]
        ]);
    }

    public function aboutUs()
    {
        $locales = app()->getLocale();

        $data = StaticWebsiteDatum::where('locale', $locales)
            ->where('key', 'about-us')
            ->firstOrFail();

        return Inertia::render('users/static/static-page', [
            'title' => 'About Us',
            'content' => $data->value,
            'image' => [
                'src' => 'https://fls-9f56b3e7-34dc-42a4-9adf-f70180fad897.laravel.cloud/banner/banner-1.webp',
                'alt' => 'About Us Image'
            ]
        ]);
    }

    public function privacyPolicy()
    {
        $locales = app()->getLocale();

        $data = StaticWebsiteDatum::where('locale', $locales)
            ->where('key', 'privacy-policy')
            ->firstOrFail();

        return Inertia::render('users/static/static-page', [
            'title' => 'Privacy Policy',
            'content' => $data->value,
            'image' => [
                'src' => 'https://fls-9f56b3e7-34dc-42a4-9adf-f70180fad897.laravel.cloud/banner/banner-1.webp',
                'alt' => 'Privacy Policy Image'
            ]
        ]);
    }

    public function cookiesPolicy()
    {
        $locales = app()->getLocale();

        $data = StaticWebsiteDatum::where('locale', $locales)
            ->where('key', 'cookie-policy')
            ->firstOrFail();

        return Inertia::render('users/static/static-page', [
            'title' => 'Cookie Policy',
            'content' => $data->value,
            'image' => [
                'src' => 'https://fls-9f56b3e7-34dc-42a4-9adf-f70180fad897.laravel.cloud/banner/banner-1.webp',
                'alt' => 'Cookie Policy Image'
            ]
        ]);
    }

    public function termsAndConditions()
    {
        $locales = app()->getLocale();

        $data = StaticWebsiteDatum::where('locale', $locales)
            ->where('key', 'terms-and-conditions')
            ->firstOrFail();

        return Inertia::render('users/static/static-page', [
            'title' => 'Terms and Conditions',
            'content' => $data->value,
            'image' => [
                'src' => 'https://fls-9f56b3e7-34dc-42a4-9adf-f70180fad897.laravel.cloud/banner/banner-1.webp',
                'alt' => 'Cookie Policy Image'
            ]
        ]);
    }

}
