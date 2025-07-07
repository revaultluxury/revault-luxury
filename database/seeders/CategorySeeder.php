<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Watches',
            'Luxury Watches',
            'Luxury Bags',
            'Luxury Accessories',
        ];

        foreach ($categories as $title) {
            Category::firstOrCreate([
                'slug' => Str::slug($title),
                'name' => $title,
            ]);
        }
    }
}
