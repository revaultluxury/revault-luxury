<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('details_transaction', function (Blueprint $table) {
            $table->uuid('product_id');
            $table->uuid('transaction_id');

            $table->string('snapshot_image');
            $table->string('snapshot_title');
            $table->text('snapshot_description')->nullable();
            $table->string('snapshot_category');
            $table->decimal('snapshot_price', 10, 2);
            $table->integer('snapshot_weight', 10, 2);

            $table->integer('quantity');
            $table->decimal('subtotal', 10, 2);

            $table->timestamps();

            $table->primary(['product_id', 'transaction_id']);
            $table->foreign('product_id')
                ->references('id')
                ->on('products');
            $table->foreign('transaction_id')
                ->references('id')
                ->on('transactions');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('details_transaction');
    }
};
