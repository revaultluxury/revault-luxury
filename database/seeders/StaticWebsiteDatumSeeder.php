<?php

namespace Database\Seeders;

use App\Models\StaticWebsiteDatum;
use Illuminate\Database\Seeder;

class StaticWebsiteDatumSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $keys = [
            'about-us',
            'contact-us',
            'cookie-policy',
            'faq',
            'payments',
            'privacy-policy',
            'shipping',
        ];

        foreach ($keys as $key) {
            StaticWebsiteDatum::firstOrCreate([
                'key' => $key,
                'locale' => 'en',
                'value' => \File::get(base_path("resources/static/{$key}.html"))
            ]);
        }
    }
}
