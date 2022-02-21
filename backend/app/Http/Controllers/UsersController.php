<?php

namespace App\Http\Controllers;

use App\Models\IsFollowingUser;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

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

    public function show($id)
    {
        $selectedUser = User::with(['instruments', 'musicGenres', 'posts'])->find($id);

        foreach ($selectedUser->posts as $post) {
            $post->media = $post->media;
        }

        return $selectedUser;
    }
}
