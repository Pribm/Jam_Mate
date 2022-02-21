<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Country;
use App\Models\FollowedByUser;
use App\Models\Genres;
use App\Models\InstrumentCategories;
use App\Models\Instruments;
use App\Models\IsFollowingUser;
use App\Models\Posts;
use App\Models\UserInstruments;
use App\Models\UserMusicGenres;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

use Intervention\Image\ImageManagerStatic as Image;

class AppController extends Controller
{
    protected $user;

    public function __construct()
    {
        $this->user = Auth()->guard('api')->user();
    }

    public function index(){

        $userInstruments = $this->user->instruments()->get()->all();
        $userGenres = $this->user->musicGenres()->get()->all();

        $userGenres = array_map(function ($genre) {
            return ['genre' => ['name' => $genre->name, 'id' => $genre->id]];
        }, $userGenres);

        $userInstruments = array_map(function ($instrument) {
            return ['instrument' => ['name' => $instrument->name, 'id' => $instrument->id]];
        }, $userInstruments);

        if(!$this->user){
            return response()->json(['error' => 'user not found']);
        }

        $following_total = count(IsFollowingUser::where('user_id', $this->user->id)->get());
        $total_followers = count(FollowedByUser::where('user_id', $this->user->id)->get());
        $total_posts = count(Posts::where('user_id', $this->user->id)->where('status','!=',0)->get());

        $user = ['user' => $this->user,
        'total_following' => $following_total,
        'total_followers' => $total_followers,
        'total_posts' => $total_posts,
        'instruments' => $userInstruments,
        'genres' => $userGenres];

        return response()->json($user);
    }

    public function update(Request $request)
    {
        $rules = [
            'name' => 'min:5|max:255|required',
            'email' => 'email|required',
        ];

        $validator = Validator::make($request->user, $rules);

        if($validator->fails()){
            return $validator->errors();
        }

        if($this->user->update($request->user)){

            $this->createUserInstruments($request->instruments);
            $this->createUserMusicGenres($request->genres);
            return $this->index();
        }

        return response()->json(['error' => 'unable to update user']);
    }

    public function getInstrumentList(Request $request) {

        if(!count($request->all())){
            $instrumentCategories = InstrumentCategories::get(['id', 'name']);
            return response()->json(['instrument_type' => $instrumentCategories, 'message' => 'Please select a instrument category']);
        }

        $instrument_list = Instruments::where('instrument_category_id', $request->id)->get(['id','name', 'instrument_category_id']);
        return response()->json($instrument_list);
    }

    public function getGenresList(){
        return Genres::get(['id', 'name']);
    }

    public function getCountries(){
        return Country::orderBy('name', 'asc')->get(['id', 'name']);
    }

    public function createUserInstruments($userInstrumentsArray)
    {
        UserInstruments::where('user_id','=',$this->user->id)->delete();
        foreach ($userInstrumentsArray as $user) {
            UserInstruments::create([
                'user_id' => $this->user->id,
                'instrument_id' => $user['instrument']['id']
            ]);
        }

    }

    public function createUserMusicGenres($GenresArray){
        UserMusicGenres::where('user_id','=',$this->user->id)->delete();
        foreach ($GenresArray as $genre) {
            UserMusicGenres::create([
                'user_id' => $this->user->id,
                'genre_id' => $genre['genre']['id']
            ]);
        }
    }

    public function uploadUserThumbnail(Request $request)
    {
        $file = $request->file('file');

        $newFileName = md5(uniqid(time())).strchr($file->getClientOriginalName(), '.');

        if($request->hasFile('file') && $file->isValid()){
            $permittedMimeTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/bmp'];

            if(in_array($file->getMimeType(), $permittedMimeTypes)){
            $path = $this->user->id.'/'.'thumbnail'.'/'.$this->user->profile_image;
                if(Storage::exists($path)){
                    Storage::delete($path);
                }

                $img = Image::make($request->file)->orientate();
                $img->resize(500, null, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                });
                if($this->user->update(['profile_image' => $newFileName, 'profile_image_is_custom' => 1])){
                    Storage::put($this->user->id.'/thumbnail'.'/'.$newFileName, $img->encode());
                    return $this->user->profile_image;
                }
            }
            return response()->json(['error' => "this file format isn't supported"]);
        }
        return response()->json(['error' => "this is not a file format"]);
    }
}
