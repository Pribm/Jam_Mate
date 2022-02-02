<?php

namespace App\Http\Controllers;

use App\Models\User;
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
        $users = User::with(['country' => function($query){
            $query->select(['name', 'id']);
        }])
        ->whereDoesntHave('isFollowing')
        ->where('id', '!=', $this->user->id)
        ->where('name', 'LIKE', '%'.$request->name.'%')
        ->where('country_id', $request->country_id)
        ;

        return $users->simplePaginate($request->num_of_users_per_page ? $request->num_of_users_per_page : 5);
    }
}
