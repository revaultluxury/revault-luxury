<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class DetailTransaction extends Model
{
    protected $table = 'details_transaction';
    protected $primaryKey = ['product_id', 'transaction_id'];
    public $incrementing = false;

    protected $fillable = [
        'product_id',
        'transaction_id',
        'snapshot_image',
        'snapshot_title',
        'snapshot_description',
        'snapshot_category',
        'snapshot_price',
        'snapshot_weight',
        'quantity',
        'subtotal',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function transaction(): BelongsTo
    {
        return $this->belongsTo(Transaction::class);
    }
}
