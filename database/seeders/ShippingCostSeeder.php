<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ShippingCostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $shippingCosts = [
            [
                'country_code' => 'US',
                'country_name' => 'United States',
                'price' => 450000,
                'service_type' => 'PAKETPOS BIASA LN'],
            [
                'country_code' => 'CN',
                'country_name' => 'China',
                'price' => 400000,
                'service_type' => 'PAKETPOS BIASA LN'],
            [
                'country_code' => 'JP',
                'country_name' => 'Japan',
                'price' => 400000,
                'service_type' => 'PAKETPOS BIASA LN'],
            [
                'country_code' => 'GB',
                'country_name' => 'United Kingdom',
                'price' => 600000,
                'service_type' => 'PAKETPOS BIASA LN'],
            [
                'country_code' => 'IT',
                'country_name' => 'Italy',
                'price' => 500000,
                'service_type' => 'PAKETPOS BIASA LN'],
            [
                'country_code' => 'FR',
                'country_name' => 'France',
                'price' => 500000,
                'service_type' => 'PAKETPOS BIASA LN'],
            [
                'country_code' => 'ES',
                'country_name' => 'Spain',
                'price' => 500000,
                'service_type' => 'PAKETPOS BIASA LN'],
            [
                'country_code' => 'KR',
                'country_name' => 'South Korea',
                'price' => 500000,
                'service_type' => 'PAKETPOS BIASA LN'],
        ];

        foreach ($shippingCosts as $cost) {
            \App\Models\ShippingCost::firstOrCreate(
                [
                    'country_code' => $cost['country_code'],
                    'country_name' => $cost['country_name'],
                    'price' => $cost['price'],
                    'service_type' => $cost['service_type'],
                ]
            );
        }
    }
}
