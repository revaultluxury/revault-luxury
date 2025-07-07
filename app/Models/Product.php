<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Product extends Model
{
    use HasFactory, SoftDeletes, HasUuids;

    public $incrementing = false; // Because you're using UUIDs
    protected $keyType = 'string';

    protected $fillable = [
        'slug',
        'title',
        'description',
        'media',
        'category_id',
        'price',
        'stock',
        'weight',
        'status',
    ];
    protected $table = 'products';

    public function category(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function galleries(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(ProductGallery::class);
    }

    public function detailTransactions(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(DetailTransaction::class, 'product_id', 'id');
    }

}
