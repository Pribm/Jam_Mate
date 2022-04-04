<?php

use App\Http\Controllers\ImageController;
use App\Http\Controllers\WebScrappers;
use App\Http\Controllers\Auth\AuthController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', function() {
    return view('welcome', ['name' => 'Paulo']);
});

Route::get('/thumb/{path}/{img}', [ImageController::class, 'getThumbnail']);

Route::prefix('webScrap')->group(function () {
    Route::get('/getGenres', [WebScrappers::class, 'getGenres']);
    Route::get('/getInstruments', [WebScrappers::class, 'getInstruments']);
    Route::get('/getCountries', [WebScrappers::class, 'seedCountries']);
});


