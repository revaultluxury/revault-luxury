<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasUuids;

    protected $table = 'categories';
    protected $fillable = ['slug', 'name'];

    public function products()
    {
        return $this->hasMany(Product::class);
    }

}
