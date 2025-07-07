<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->words(3, true);

        return [
            'slug' => Str::slug($title) . '-' . Str::random(6),
            'title' => $title,
            'description' => $this->faker->boolean(80)
                ? fn() => implode('', array_map(fn($p) => "<p>$p</p>", $this->faker->paragraphs($this->faker->numberBetween(1, 9))))
                : null,
            'category_id' => Category::inRandomOrder()->first()->id
                ?? Category::factory()->create()->id,
            'price' => $this->faker->randomFloat(2, 10, 10000),
            'stock' => $this->faker->numberBetween(0, 100),
            'weight' => $this->faker->numberBetween(50, 5000),
            'sold' => $this->faker->numberBetween(0, 100),
            'status' => $this->faker->randomElement(['active', 'inactive']),
        ];
    }

    public function configure(): ProductFactory|Factory
    {
        return $this->afterCreating(function (Product $product) {
            // Create product galleries
            $galleryCount = $this->faker->numberBetween(1, 5);
            for ($i = 0; $i < $galleryCount; $i++) {
                $imageText = Str::random(8);
                $product->galleries()->create([
                    'media_url' => "https://placehold.jp/c7c7c7/000000/640x480.png?text=" . urlencode($imageText),
                    'type' => 'image',
                ]);
            }
        });
    }
}
