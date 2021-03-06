<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
       Http::get(env('APP_URL').':8000/webScrap/getGenres');
       Http::get(env('APP_URL').':8000/webScrap/getCountries');
        Http::get(env('APP_URL').':8000/webScrap/getInstruments');
    }
}
