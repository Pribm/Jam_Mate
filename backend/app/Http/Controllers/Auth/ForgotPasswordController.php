<?php

namespace App\Http\Controllers\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Password;
use App\Http\Requests\ForgotRequest;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use Illuminate\Mail\Message;
use App\Http\Requests\ResetRequest;
use Illuminate\Support\Facades\Hash;



class ForgotPasswordController extends Controller
{
    public function forgot(ForgotRequest $request){
        $email = $request->input('email');

        if(User::where('email', $email)->doesntExist()){
            return response([
                'message' => 'User doesn\'t exists.'
            ], 404);
        }

        $token = Str::random(10);

        try {
            DB::table('password_resets')->insert([
                'email' => $email,
                'token' => $token
            ]);
    
            //Send email

            Mail::send('Mails.forgot', ['token' => $token], function (Message $message) use ($email) {
                $message->to($email);
                $message->subject('Reset your password');
            });

            return response(['message' => 'Check your email'], 200);
        } catch (\Exception $e) {
            return response([
                'message' => $e->getMessage()
            ], 400);
        }
    }

    public function reset(ResetRequest $request) {
        $token = $request->input('token');

        if(!$passwordResets = DB::table('password_resets')->where('token', $token)->first()){
            return response([
                'message' => 'Invalid token!'
            ], 400);
        }

        /** @var User $user */
        if(!$user = User::where('email', $passwordResets->email)->first()){
            return response([
                'message' => 'User doesn\'t exist!'
            ], 400);
        }

        $user->password = Hash::make($request->input('password'));

        $user->save();

        return response([
            'message' => 'Success'
        ]);
    }
}
