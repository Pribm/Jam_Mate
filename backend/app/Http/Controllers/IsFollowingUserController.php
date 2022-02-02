<?php

namespace App\Http\Controllers;

use App\Models\IsFollowingUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class IsFollowingUserController extends Controller
{
    protected $user;

    public function __construct()
    {
        $this->user = Auth()->guard('api')->user();
    }

    public function index()
    {
        $following = IsFollowingUser::with('following')->where('user_id', $this->user->id)->simplePaginate();
        $following_total = count(IsFollowingUser::with('following')->where('user_id', $this->user->id)->get());

        $following->transform(function ($f){
            return $f->getRelations()['following'];
        });
        return ['total_following' => $following_total, $following];
    }

    public function store(Request $request)
    {
        $validator = Validator::make(['is_following' => $request->followed_user_id], ['is_following' => Rule::unique('is_following_users')->where(function ($query) {
            return $query->where('user_id', $this->user->id);
        })]);

        if($validator->fails()){
            return $validator->errors();
        }

        $following = IsFollowingUser::create(['user_id' => $this->user->id, 'is_following' => $request->followed_user_id]);

        if($following->id){
            return response()->json($following->with('following')->first()->getRelations());
        }
        return response()->json(['error' => 'this user could not be followed']);
    }

    public function show($id)
    {
        $followed_user = IsFollowingUser::with('following')->find($id)->getRelations();
        return $followed_user;
    }

    public function delete($id)
    {

    }
}
