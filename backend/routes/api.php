<?php

use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/profile', function (Request $request) {
        return response()->json(Auth::user(), Response::HTTP_OK);
    });
});

Route::middleware(['auth:sanctum', 'can:admin'])->group(function () {
    Route::apiResource('/users', UserController::class);
});

Route::middleware(['auth:sanctum'])->group(function () {
});

// Categorias

// POST - Cria um novo registro na tabela categories
Route::post('/categories', [CategoriesController::class, 'store']);
// GET - Retorna todos os registros da tabela categories
Route::get('/categories', [CategoriesController::class, 'index']);
// GET - Retorna um registro específico da tabela categories
Route::get('/categories/{id}', [CategoriesController::class, 'show']);
// PUT - Atualiza um registro específico da tabela categories
Route::put('/categories/{id}', [CategoriesController::class, 'update']);
// POST - Atualiza um registro específico da tabela categories (method spoofing para FormData)
Route::post('/categories/{id}', [CategoriesController::class, 'update']);
// DELETE - Remove um registro específico da tabela categories
Route::delete('/categories/{id}', [CategoriesController::class, 'destroy']);


// Imóveis
// POST - Cria um novo registro na tabela properties
Route::post('/properties', [PropertyController::class, 'store']);
// GET - Retorna todos os registros da tabela properties
Route::get('/properties', [PropertyController::class, 'index']);
// GET - Retorna um registro específico da tabela properties
Route::get('/properties/{id}', [PropertyController::class, 'show']);
// PUT - Atualiza um registro específico da tabela properties
Route::put('/properties/{id}', [PropertyController::class, 'update']);
// DELETE - Remove um registro específico da tabela properties
Route::delete('/properties/{id}', [PropertyController::class, 'destroy']);


// API Resource - Retorna todas as rotas da tabela categories
// Route::apiResource('/categories', CategoriesController::class);


Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

require __DIR__.'/auth.php';
