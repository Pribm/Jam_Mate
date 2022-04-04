<?php

namespace App\Http\Controllers;

use App\Models\IsFollowingUser;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use App\Models\Posts;

class UsersController extends Controller
{
    protected $user;

    public function __construct()
    {
        $this->user = Auth()->guard('api')->user();
    }

    public function index(Request $request)
    {
        $isFollowingArray = $this->user->isFollowing()->get('is_following');

        $isFollowingArray->transform(function($following){
            return $following->is_following;
        });

        $users = User::whereNotIn('id', $isFollowingArray)->where('id','!=',$this->user->id)->paginate(6);

        return $users;
    }

    public function search(Request $request)
    {
        if($request->searchBox){
            $users = User::with(['bands'])->whereHas('bands', function ($q) use ($request){
                $q->where('name','LIKE','%'.$request->searchBox.'%');
            })
            ->orWhere('name','LIKE','%'.$request->searchBox.'%')
            ->orWhere('email','LIKE','%'.$request->searchBox.'%')
            ->paginate(6);
    
            if(count($users->items()) !== 0){
                return $users;
            }

            return response()->json(['message' => 'No users found!']);
        }
    }

    public function show($id)
    {
        $selectedUser = User::with([
        'instruments',
        'musicGenres',
        'bands' => function($query) {
            $query->where('status', '!=', 0);
        }])->find($id);

        $posts = Posts::where('user_id', $id)->where('status','!=',0)->simplePaginate(20);

        foreach ($posts as $post) {
            $post->media = $post->media;
        }

        $selectedUser->posts = $posts;

        return $selectedUser;
    }
}
