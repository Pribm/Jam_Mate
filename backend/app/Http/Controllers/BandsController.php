<?php

namespace App\Http\Controllers;

use App\Models\Band;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class BandsController extends Controller
{

    public function __construct()
    {
        $this->user = Auth()->guard('api')->user();
    }

    public function index()
    {
        return $this->user->bands;
    }


    public function store()
    {
        $band = Band::with(['user', 'genres'])->firstOrCreate([
            'status' => 0
        ]);

        DB::table('band_user')->updateOrInsert(['user_id' => $this->user->id, 'band_id' => $band->id]);

        $band = $band->fresh(['user', 'genres']);

        return response()->json($band);
    }


    public function show($id)
    {
        try {
            $band = Band::with('user')->find($id);
            if($band->id){
                return $band;
            }
        } catch (\Throwable $th) {
            return response()->json(['error' => 'the band could not be found'], 404);
        }
    }


    public function update(Request $request, $id)
    {
        $band = Band::whereHas('user', function($q) {
            $q->where('user_id', $this->user->id);
        })->find($id);
        return $band;
    }


    public function destroy($id)
    {
        try {
            $band = Band::find($id);
            if($band->id){
                $band->destroy($id);
                return response()->json($band->id);
            }
        } catch (\Throwable $th) {
            return response()->json(['error' => 'the band could not be found'], 404);
        }
    }
}
