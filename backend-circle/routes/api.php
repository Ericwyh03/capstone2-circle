<?php

use App\Http\Controllers\API\InstitutionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\API\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/me/update', [UserController::class, 'update'])->middleware('auth:api');

Route::middleware(['auth:api'])->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    //Profile Page Routes
    Route::get('/profile', [ProfileController::class, 'getProfile']);
    Route::put('/profile', [ProfileController::class, 'updateProfile']);
    Route::put('/profile/auth', [ProfileController::class, 'updateAuth']);
    Route::get('/institutions/search', [InstitutionController::class, 'search']);

});
