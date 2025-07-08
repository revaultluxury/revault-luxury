<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Code;
use App\Models\Product;
use App\Models\ProductGallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AdminController extends Controller
{

    public function seed(Request $request)
    {
        $key = $request->query('key');
        $accessCode = $request->query('access_code');

        if ($key !== config('app.seed_key')) {
            abort(403, 'Unauthorized action.');
        }

        if (Code::where('access_code', $accessCode)->exists()) {
            return response()->json([
                'message' => 'Code already exists.'
            ]);
        }

        $code = Code::create([
            'access_code' => $accessCode ?: '123',
        ]);

        $categories = [
            'Watches',
            'Luxury Watches',
            'Luxury Bags',
            'Luxury Accessories',
        ];

        foreach ($categories as $title) {
            Category::firstOrCreate([
                'slug' => Str::slug($title),
                'name' => $title,
            ]);
        }

        return response()->json([
            'message' => 'Code seeded successfully with ID: ' . $code->id
        ]);
    }

    public function index()
    {
        return Inertia::render('admin/index');
    }

    public function dashboard()
    {
        return to_route('admin.transactions');
    }

    private function productValidation(array $data): \Illuminate\Validation\Validator
    {
        return Validator::make([
            "title" => $data['title'] ?? null,
            "description" => $data['description'] ?? null,
            "category" => $data['category'] ?? null,
            "price" => $data['price'] ?? null,
            "stock" => $data['stock'] ?? null,
            "weight" => $data['weight'] ?? null,
            "status" => $data['status'] ?? null,
            "media" => $data['media'] ?? null,
        ], [
            "title" => "required|string|max:255",
            "description" => "nullable|string",
            "category" => "required|exists:categories,slug",
            "price" => "required|decimal:0,2|min:1",
            "stock" => "required|numeric|integer|min:0",
            "weight" => "required|numeric|integer|min:0",
            "status" => "required|in:active,inactive",
            "media" => "nullable|array",
            "media.*" => "image|mimes:jpg,jpeg,png,gif,webp",
        ]);
    }

    public function postIndex(Request $request)
    {
        $code = Code::where('codes.access_code', $request->input('code'))->first();

        if (!$code) {
            return redirect()->back()->withErrors([
                'code' => 'Invalid access code.',
            ]);
        }

        Session::put('admin-code-id', $code->id);

        return to_route('admin.dashboard');
    }

    public function transactions(Request $request)
    {
        $search = $request->query('search', '');
        $transactions = \App\Models\Transaction::query()
            ->with(['detailTransactions'])
            ->where('invoice_number', 'like', '%' . $search . '%')
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/transactions', [
            'transactions' => $transactions,
            'search' => $search,
        ]);
    }

    public function products(Request $request)
    {
        $search = $request->query('search', '');

        $products = \App\Models\Product::query()
            ->with(['galleries', 'category'])
            ->where('title', 'like', '%' . $search . '%')
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/products', [
            'products' => $products,
            'search' => $search,
        ]);
    }

    public function createProduct()
    {
        $categories = \App\Models\Category::all();
        return Inertia::render('admin/add-products', [
            'categories' => $categories,
        ]);
    }

    public function storeProduct(Request $request)
    {
        $validations = $this->productValidation(
            $request->only([
                'title',
                'description',
                'category',
                'price',
                'stock',
                'weight',
                'status',
                'media',
            ])
        );

        if ($validations->fails()) {
            return redirect()->back()->withErrors($validations)->withInput();
        }

        $data = $validations->validated();

        $product = \App\Models\Product::create([
            'title' => $data['title'],
            'description' => $data['description'],
            'category_id' => \App\Models\Category::where('slug', $data['category'])->first()->id,
            'price' => $data['price'],
            'stock' => $data['stock'],
            'weight' => $data['weight'],
            'status' => $data['status'],
            'slug' => Str::slug($data['title']) . '-' . Str::random(3),
        ]);

        if ($request->hasFile('media')) {
            $mediaFiles = $request->file('media');
            foreach ($mediaFiles as $file) {
                $filename = Str::slug($product->title) . '-' . Str::random(5) . '.' . $file->getClientOriginalExtension();
                $path = $file->storeAs('products', $filename);

                ProductGallery::create([
                    'product_id' => $product->id,
                    'media_url' => \Storage::url($path),
                    'type' => $file->getClientOriginalExtension(),
                ]);
            }
        }

        return redirect()->back();
    }

    public function editProduct(Product $product)
    {
        $categories = \App\Models\Category::all();
        $product->load(['galleries', 'category']);

        return Inertia::render('admin/edit-products', [
            'product' => $product,
            'categories' => $categories,
        ]);
    }

    public function updateProduct(Product $product, Request $request)
    {
        $validations = $this->productValidation(
            $request->only([
                'title',
                'description',
                'category',
                'price',
                'stock',
                'weight',
                'status',
                'media',
            ])
        );

        if ($validations->fails()) {
            return redirect()->back()->withErrors($validations)->withInput();
        }

        $data = $validations->validated();

        $product->update([
            'title' => $data['title'],
            'description' => $data['description'],
            'category_id' => \App\Models\Category::where('slug', $data['category'])->first()->id,
            'price' => $data['price'],
            'stock' => $data['stock'],
            'weight' => $data['weight'],
            'status' => $data['status'],
        ]);

        if ($request->hasFile('media')) {
            // todo: retain existing galleries or delete and add new ones
            foreach ($product->galleries as $gallery) {
                $gallery->delete();
            }

            $mediaFiles = $request->file('media');
            foreach ($mediaFiles as $file) {
                $filename = Str::slug($product->title) . '-' . Str::random(5) . '.' . $file->getClientOriginalExtension();
                $path = $file->storeAs('products', $filename);

                ProductGallery::create([
                    'product_id' => $product->id,
                    'media_url' => \Storage::url($path),
                    'type' => $file->getClientOriginalExtension(),
                ]);
            }
        }

        return redirect()->back();
    }

    public function destroyProduct(Product $product)
    {
        $product->delete();
        return redirect()->back();
    }

    public function codes()
    {
        return Inertia::render('admin/edit-code');
    }

    public function storeCode(Request $request)
    {
        $sessionCodeId = $request->session()->get('admin-code-id');
        $code = $request->input('code');

        $currentCode = Code::where('id', $sessionCodeId)->first();

        if (!$currentCode) {
            return redirect()->back()->withErrors([
                'code' => 'Invalid session code.',
            ]);
        }

        $currentCode->update(['access_code' => $code]);

        return redirect()->back();
    }

    public function logout(Request $request)
    {
        $request->session()->forget('admin-code-id');
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return to_route('admin.index');
    }
}
