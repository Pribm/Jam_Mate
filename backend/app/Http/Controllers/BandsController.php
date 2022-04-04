<?php

namespace App\Http\Controllers;

use App\Models\Band;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

use Intervention\Image\ImageManagerStatic as Image;
use App\Models\User;

class BandsController extends Controller
{

    public function __construct()
    {
        $this->user = Auth()->guard('api')->user();
    }

    public function index(Request $request)
    {
        if(!$request->user_id){
           $bands =  User::with(['bands' => function($q) {
               $q->where('status','!=', 0);
           }, 'bands.genres'])->find($this->user->id)->getRelations();
           return $bands['bands'];
        }
        
        $user = User::where('id', $request->user_id)->first();
        
        if($user){
            if(count($user->bands) != 0){
                return $user->bands;
            }
        }
        return response(['error' => 'There\'s no bands registered']);
    }


    public function store()
    {
        
        $band = Band::with(['genres'])->firstOrCreate([
            'status' => 0
        ]);

        DB::table('band_user')->updateOrInsert(['user_id' => $this->user->id, 'band_id' => $band->id]);

        $band = $band->fresh(['genres']);

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
        
        $band = $this->user->bands->find($id);
        
        $rules = [
            'name' => 'required|unique:bands',
            'release_text' => 'min:30',
            'email' => 'required|unique:bands|max:350|email'
        ];

        $validator = Validator::make($request->all(), $rules);

        if($validator->fails()){
            return response()->json(['errors' => $validator->errors()]);
        }

        
        if($band->status === 0){
            //Create band
            $data = $request->all();
            $data['status'] = 1;
            if($band->update($data)){
                foreach ($data['genres'] as $genre) {
                    DB::table('band_music_genres')->insert(['band_id'=> $band->id, 'genre_id' => $genre['id']]);
                }
                return $band->with(['user', 'genres'])->find($id);
            }
        }else{
            //Update band
            $data = $request->all();
            if($band->update($data)){
                return $band->with(['user', 'genres'])->find($id);
            }
        }

        
    }

    public function uploadImage(Request $request, $upload_field = null, $id){

        $band = $this->user->bands->find($id);

        try {
            $image = $request->file($upload_field);

            if($image->getSize() > 2000000){
                return response()->json(['error' => "Due to free storage limitations, you could only upload files below 2MB."], 400);
            }

            $file_name = md5(uniqid(time())) . strchr($image->getClientOriginalName(), '.');

            $band_image_fields = [
                'technical_rider_url',
                'stagemap_url',
                'profile_image'
            ];

            if(in_array($upload_field, $band_image_fields)){
                if ($request->hasFile($upload_field) && $image->isValid()) {
                    $permittedMimeTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/bmp'];
    
                    if (in_array($image->getMimeType(), $permittedMimeTypes)) {
                        $path = $this->user->id . '/' . 'bands' . '/' . $id . '/' . $upload_field;
    
                        if (Storage::exists($path)) {
                            Storage::deleteDirectory($path);
                        }
    
                        $img = Image::make($image)->orientate();
    
                        $img->resize(500, null, function ($constraint) {
                            $constraint->aspectRatio();
                            $constraint->upsize();
                        });
    
                        if ($band->update([$upload_field => $file_name])) {
                            Storage::put($path . '/' . $file_name, $img->encode());
                            return response()->json(['success' => $band->$upload_field]);
                        }
                    }
                    return response()->json(['error' => "this file format isn't supported"], 400);
                }
            }
            return response()->json(['error' => "this field not exists in band media files"], 400);
        } catch (\Throwable $th) {
            return ['error' => $th->getMessage(), 'hint' => 'you the upload key must be specified in the route'];
        }
    }


    public function destroy($id)
    {   
        if(DB::table('band_user')->where('user_id', $this->user->id)->where('band_id', $id)->delete()){
                return $this->user->bands;
        }
        return response(['error' => 'the band couldn\'t be found']);
    }
}
