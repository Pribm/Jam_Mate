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
        $following = IsFollowingUser::with('user', 'posts')->where('user_id', $this->user->id)->simplePaginate();
        $following_total = count(IsFollowingUser::with('user')->where('user_id', $this->user->id)->get());

        $following->transform(function ($f){
            return $f->getRelations()['user'];
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
            return response()->json(IsFollowingUser::with('user')->find($following->id)->getRelations());
        }
        return response()->json(['error' => 'this user could not be followed']);
    }

    public function show($id)
    {
        $followed_user = IsFollowingUser::where('user_id', $this->user->id)->where('is_following', $id)->with('user')->first();
        if($followed_user){
            return $followed_user->getRelations();
        }
        return response()->json(['error' => 'you are not following this user']);
    }

    public function destroy($id)
    {
        $followed_user = IsFollowingUser::where('user_id', $this->user->id)->where('is_following',$id)->first();
        if($followed_user){
            if($followed_user->delete()){
                return response()->json(['success' => 'The follower was deleted successfully', 'follower' => $id]);
            }
            return response()->json(['error' => "there is something wrong with your request"]);
        }
        return response()->json(['error' => "you couldn't delete this follower"]);
    }
}
