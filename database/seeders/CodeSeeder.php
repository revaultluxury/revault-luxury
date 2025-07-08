<?php

namespace Database\Seeders;

use App\Models\Code;
use Illuminate\Database\Seeder;

class CodeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Code::firstOrCreate([
            'access_code' => '123',
        ]);
    }
}
