<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function store(Request $request){
        $rules = [
            'name' => 'required|string|max:255|min:5',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6'
        ];

        $feedback = ['password.min' => 'your password is too short, you need to provide a better password'];

        $validator = Validator::make($request->all(), $rules, $feedback);

        if($validator->fails()){
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->save();

        if($user->id){
            return response()->json([
                'access_token' => $user->createToken('auth-api')->accessToken
            ], 200);
        }

        return response()->json(['Error' => 'Error when registering user']);
    }
}
