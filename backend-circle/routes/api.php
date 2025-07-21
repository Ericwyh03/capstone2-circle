<?php

use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\API\InstitutionController;
use App\Http\Controllers\API\MatchController;
use App\Http\Controllers\API\MatchRequestController;
use App\Http\Controllers\API\MentorController;
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

    //Main Function 1 - Matchmaking
    Route::get('/matches', [MatchController::class, 'findMatches']);

    //Main Function - Matchmaking Extended
    Route::post('/match-requests/accept/{id}', [MatchRequestController::class, 'accept']);
    Route::get('/match-friends', [MatchRequestController::class, 'getMutualMatches']);
    Route::get('/friends', [MatchRequestController::class, 'friends']);
    Route::post('/match-request', [MatchRequestController::class, 'sendRequest']);
    Route::get('/match-requests/incoming', [MatchRequestController::class, 'incomingRequests']);
    Route::post('/match-request/respond', [MatchRequestController::class, 'respond'])->middleware('auth:api');

    //Main Function 2 - Events
    Route::post('/events', [EventController::class, 'store']);
    Route::get('/events', [EventController::class, 'index']);
    Route::post('/events/{event}/join', [EventController::class, 'join']);
    Route::get('/myevents', [EventController::class, 'myEvents']);

    //Main Function 3 - Mentor
    Route::post('/mentors', [MentorController::class, 'store']);
    Route::get('/mentors', [MentorController::class, 'index']);
    Route::get('/mentors/{id}', [MentorController::class, 'show']);
    Route::get('/mentor-institutions', [MentorController::class, 'getInstitutions']);


});
