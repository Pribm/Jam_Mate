<?php

namespace App\Http\Controllers;

use App\Models\FollowedByUser;
use App\Models\User;

class FollowedByUserController extends Controller
{
    protected $user;
    public function __construct()
    {
        $this->user = Auth()->guard('api')->user();
    }

    public function index()
    {
        $followers = FollowedByUser::with('follower')->where('user_id', $this->user->id)->simplePaginate();
        $total_followers = count(FollowedByUser::with('follower')->where('user_id', $this->user->id)->get());
        $followers->transform(function($f){
            return $f->getRelations()['follower'];
        });
        return ['total_followers' => $total_followers ,$followers];
    }
}
