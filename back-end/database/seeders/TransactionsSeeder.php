<?php

namespace Database\Seeders;
use App\Models\Transactions;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TransactionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       Transactions::factory()->count(20)->create();
        
    
    }
}
