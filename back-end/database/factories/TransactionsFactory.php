<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transactions>
 */
class TransactionsFactory extends Factory
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
        'product_id' => $this->faker->numberBetween(1, 100),
        'quantity' => $this->faker->numberBetween(1, 50),
        'total' => $this->faker->randomFloat(2, 1, 1000),
        'date' => $this->faker->dateTimeThisYear(),
        ];
    }
}
