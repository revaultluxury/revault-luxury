<?php

use Illuminate\Support\Facades\Route;

Route::get('/', [\App\Http\Controllers\UserController::class, 'welcome'])->name('index');

Route::prefix('/pages')->group(function () {
    Route::get('/faq', [\App\Http\Controllers\WebsiteController::class, 'faq'])->name('pages.faq');
    Route::get('/payments', [\App\Http\Controllers\WebsiteController::class, 'payments'])->name('pages.payments');
    Route::get('/shipping', [\App\Http\Controllers\WebsiteController::class, 'shipping'])->name('pages.shipping');
    Route::get('/returns', [\App\Http\Controllers\WebsiteController::class, 'returns'])->name('pages.returns');
    Route::get('/cancellations', [\App\Http\Controllers\WebsiteController::class, 'cancellations'])->name('pages.cancellations');

    Route::get('/contact-us', [\App\Http\Controllers\WebsiteController::class, 'contactUs'])->name('pages.contact-us');
    Route::get('/about-us', [\App\Http\Controllers\WebsiteController::class, 'aboutUs'])->name('pages.about-us');

    Route::get('/privacy-policy', [\App\Http\Controllers\WebsiteController::class, 'privacyPolicy'])->name('pages.privacy-policy');
    Route::get('/cookie-policy', [\App\Http\Controllers\WebsiteController::class, 'cookiesPolicy'])->name('pages.cookies-policy');
});

Route::post('/cart', [\App\Http\Controllers\UserController::class, 'cart'])->name('products.cart');
Route::prefix('/checkout')->group(function () {
    Route::post('/create', [\App\Http\Controllers\UserController::class, 'checkoutCreate'])
        ->name('products.checkout.create');
    Route::get('/session/{path}', [\App\Http\Controllers\UserController::class, 'checkout'])
        ->name('products.checkout');
    Route::post('/session/{path}', [\App\Http\Controllers\UserController::class, 'checkoutSession'])
        ->name('products.checkout.session');
});

Route::prefix('products')->group(function () {
    Route::get('/categories/{category}', [\App\Http\Controllers\UserController::class, 'productPerCategory'])
        ->name('products.per-category');
    Route::get('/{slug}', [\App\Http\Controllers\UserController::class, 'detailsProduct'])->name('products.show');
});

Route::prefix('admin')->group(function () {
    Route::group(['middleware' => ['guest-with-session']], function () {
        Route::get('/', [\App\Http\Controllers\AdminController::class, 'index'])->name('admin.index');
        Route::post('/', [\App\Http\Controllers\AdminController::class, 'postIndex'])->name('admin.index.post');
        Route::get('/seed', [\App\Http\Controllers\AdminController::class, 'seed'])->name('admin.seed');
    });
    Route::group(['middleware' => ['auth-with-session']], function () {
        Route::get('/dashboard', [\App\Http\Controllers\AdminController::class, 'dashboard'])->name('admin.dashboard');
        Route::get('/transactions', [\App\Http\Controllers\AdminController::class, 'transactions'])->name('admin.transactions');

        Route::get('/products', [\App\Http\Controllers\AdminController::class, 'products'])->name('admin.products');
        Route::get('/products/create', [\App\Http\Controllers\AdminController::class, 'createProduct'])->name('admin.products.create');
        Route::get('/products/{product}/edit', [\App\Http\Controllers\AdminController::class, 'editProduct'])->name('admin.products.edit');

        Route::post('/products', [\App\Http\Controllers\AdminController::class, 'storeProduct'])->name('admin.products.store');
        Route::post('/products/{product}', [\App\Http\Controllers\AdminController::class, 'updateProduct'])->name('admin.products.update');
        Route::delete('/products/{product}', [\App\Http\Controllers\AdminController::class, 'destroyProduct'])->name('admin.products.destroy');

        Route::get('/codes', [\App\Http\Controllers\AdminController::class, 'codes'])->name('admin.codes');
        Route::post('/codes', [\App\Http\Controllers\AdminController::class, 'storeCode'])->name('admin.codes.store');

        Route::post('/logout', [\App\Http\Controllers\AdminController::class, 'logout'])->name('admin.logout');
    });
});

Route::post('/checkout/notification', [\App\Http\Controllers\PaymentController::class, 'notification'])
    ->name('checkout.notification')
    ->withoutMiddleware('web');
