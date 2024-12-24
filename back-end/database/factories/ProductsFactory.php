<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Products>
 */
class ProductsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
        'id' => $this->faker->unique()->numberBetween(1, 1000),
        'barcode' => $this->faker->unique()->numberBetween(1000000000, 9999999999),
        'name' => $this->faker->word,
        'description' => $this->faker->paragraph,
        'price' => $this->faker->randomFloat(2, 1, 1000),
        'stock' => $this->faker->numberBetween(0, 100),
        'image' => $this->faker->imageUrl(640, 480, 'products', true),
        ];
    }
}
