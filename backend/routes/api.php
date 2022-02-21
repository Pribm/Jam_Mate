<?php

use App\Http\Controllers\Api\PostsController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\BandsController;
use App\Http\Controllers\FollowedByUserController;
use App\Http\Controllers\IsFollowingUserController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\UsersController;
use App\Services\SocialAccountsService;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/register', [AuthController::class, 'store']);



Route::prefix('app')->group(function () {

    Route::get('/user', 'App\Http\Controllers\Api\AppController@index');
    Route::put('/user', 'App\Http\Controllers\Api\AppController@update');

    Route::apiResource('/band', BandsController::class);

    Route::post('/tumbnailUpdate', 'App\Http\Controllers\Api\AppController@uploadUserThumbnail');

    Route::get('/instruments', 'App\Http\Controllers\Api\AppController@getInstrumentList');
    Route::get('/genres', 'App\Http\Controllers\Api\AppController@getGenresList');
    Route::get('/countries', 'App\Http\Controllers\Api\AppController@getCountries');
});

Route::prefix('network')->group(function() {
    Route::get('/users', [UsersController::class, 'index']);
    Route::get('/users/{id}', [UsersController::class, 'show']);
    Route::apiResource('/followers', FollowedByUserController::class)->only(['index']);
    Route::apiResource('/following', IsFollowingUserController::class);
});

Route::get('social', [SocialAccountsService::class, 'findOrCreate']);

Route::apiResource('/posts', PostsController::class);
Route::apiResource('/media', MediaController::class)->only(['store']);
