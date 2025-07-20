<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class ShippingCost extends Model
{
    use HasUuids;

    protected $table = 'shipping_costs';

    protected $fillable = [
        'country_code',
        'country_name',
        'price',
        'service_type',
    ];

    protected $casts = [
        'price' => 'decimal:2',
    ];

    public $incrementing = false;

    protected $keyType = 'string';

    public $timestamps = true;

    public function scopeForCountry($query, string $country): \Illuminate\Database\Eloquent\Builder
    {
        return $query->where(\DB::raw('LOWER(country_name)'), strtolower($country));
    }

    public function scopeForCountryCode($query, string $countryCode): \Illuminate\Database\Eloquent\Builder
    {
        return $query->where(\DB::raw('LOWER(country_code)'), strtolower($countryCode));
    }
}
