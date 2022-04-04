<?php

namespace App\Http\Controllers;

use App\Models\Country;
use App\Models\Genres;
use App\Models\InstrumentCategories;
use App\Models\Instruments;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class WebScrappers extends Controller
{
    public function getGenres() {

        $response = Http::withOptions(['verify' => false])->withToken(env('SPOTIFY_API_TOKEN'))->get('https://api.spotify.com/v1/recommendations/available-genre-seeds');
        
        $response = json_decode($response);

        if(isset($response->genres)){
            $genres = $response->genres;

            if(Genres::count() === 0){
                foreach ($genres as $genre) {
                    Genres::create([
                        'name' => $genre,
                    ]);
                }
            }else{
                return response()->json(['message' => 'The genres already seeded']);
            }
        }  
        
        return $response->error->message;
    }

    public function getInstruments() {
        $content = file_get_contents('https://www.dicio.com.br/instrumentos-musicais/');
        preg_match_all('/<h2>(.*?)<\/ul>/s', $content, $matches);

        $list = [];

        foreach ($matches[1] as $match) {
            preg_match_all('/(.*?)<\/h2>/', $match, $instrumentCategory);
            $categ = strip_tags($instrumentCategory[0][0]);

            preg_match_all('/(?s)<li>(.*?)<\/li>/', $match, $instrumentList);

            array_push($list, ['instrument_cattegory' => utf8_decode($categ), 'instruments' => $instrumentList[0]]);
        }

        $list = array_map(function ($arrayInst) {
            $instWithoutTags = array_map(function ($string) {
                return strip_tags($string);
            }, $arrayInst['instruments']);

            $arrayInst['instruments'] = $instWithoutTags;
            return $arrayInst;
        }, $list);


            if(Instruments::count() === 0 && InstrumentCategories::count() === 0){
                foreach ($list as $key => $instCateg) {
                    InstrumentCategories::create([
                        'name' => html_entity_decode($instCateg['instrument_cattegory']),
                    ]);

                    foreach ($instCateg['instruments'] as $instrument) {
                        Instruments::create(['name' => html_entity_decode($instrument), 'instrument_category_id' => $key+1]);
                    }
                }
            }else{
                return response()->json(['message' => 'The Instruments already seeded']);
            }

    }

    public function seedCountries() {
        $response = Http::withOptions(['verify' => false])->get('https://restcountries.com/v3.1/all');

        if(Country::count() === 0){
            foreach (json_decode($response) as $country) {
                Country::create(['name' => $country->name->common]);
            }
            return 'Country database was seeded';
        }

        return 'The country database was already seeded';
    }


}
