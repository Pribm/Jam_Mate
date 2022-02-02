<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MediaFile;
use App\Models\Posts;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PostsController extends Controller
{
    public function __construct()
    {
        $this->user = Auth()->guard('api')->user();
    }

    public function index(Request $request)
    {
        if($request->user_id){
            $posts = Posts::with('user', 'media')->where('user_id', $request->user_id)->where('status','!=', 0)->orderBy('created_at', 'DESC')->paginate(20);
            return $posts;
        }


        $posts = Posts::with('user', 'media')->where('status','!=', 0)->orderBy('created_at', 'DESC')->paginate(20);
        return $posts;
    }

    public function store()
    {
        $post = Posts::with('media')->firstOrCreate(['user_id' => $this->user->id, 'status' => 0]);
        $post = $post->fresh('media');
        return $post;
    }


    public function show($id)
    {
        $post = Posts::where('user_id', $this->user->id)->with('media')->find($id);

        if($post->id){
            return $post;
        }

        return $this->error('Post not found!');
    }

    public function update(Request $request, $id)
    {
        $post = Posts::where('user_id', $this->user->id)->with('user', 'media')->find($id);

        if($post->id){
            $post->fill($request->all());
            $post->status = 1;


            if($post->save()){
                return $post;
            }
            return response()->json(['error' => 'create post failed!']);
        }
        return response()->json(['error' => 'Post not found!']);
    }

    public function destroy($id)
    {
        if($this->user->id !== Posts::find($id)->user_id){
            return response()->json(['error' => "you're unable to delete this post!"], 403);
        }
        $post = Posts::where('user_id', $this->user->id)->find($id);
        $mediaFiles = MediaFile::where('post_id', $post->id)->get();

        foreach ($mediaFiles as $mediaFile) {
            $mediaFile->delete();
        }


        if($post->id){
            Storage::deleteDirectory($this->user->id.'/'.'media'.'/posts'.'/'.$post->id);
            if($post->delete()){
                return response()->json(['success'=>'the post was succesfully deleted!']);
            }
            return response()->json(['error' => 'error on delete this post']);
        }

        return response()->json(['error' => 'post was not found']);
    }
}
