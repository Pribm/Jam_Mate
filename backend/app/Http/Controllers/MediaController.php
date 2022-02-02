<?php

namespace App\Http\Controllers;

use App\Models\MediaFile;
use App\Models\PostMedia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

use Intervention\Image\ImageManagerStatic as Image;

class MediaController extends Controller
{
    
    public function __construct()
    {
        $this->user = Auth()->guard('api')->user();
    }

    public function index()
    {
        //
    }


    public function store(Request $request)
    {  
        $file = $request->file('file');
        $fileName = md5(uniqid(time())).'.'.$file->getClientOriginalExtension();

        if($request->post_id){
            $path = $this->user->id.'/media'.'/posts'.'/'.$request->post_id.'/';
        
            $media = MediaFile::create([
                'file_url' => $fileName,
                'mime_type' => $file->getClientMimeType(),
                'post_id' => $request->post_id
            ]);

            if($media->id){
                $img = Image::make($request->file)->orientate();
                $img->resize(500, null, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                });
                Storage::put($path.$fileName, $img->encode());
                return response()->json(['success' => 'upload was successfull']);
            }
            return $this->error("could not complete the upload, there's some data missing");
        }
        return response()->json(['error' => "there's something wrong with your request"]);
    }


    public function show($id)
    {
        //
    }


    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
