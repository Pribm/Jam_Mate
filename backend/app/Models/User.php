<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = ['id'];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'pivot'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function findForPassport($username)
    {
        return $this->where('name', $username)->orWhere('email', $username)->first();
    }

    public function socialAccounts()
    {
        return $this->hasMany(SocialAccount::class);
    }

    public function bands()
    {
        return $this->belongsToMany(Band::class,'band_user', 'user_id', 'band_id');
    }

    public function instruments()
    {
        return $this->belongsToMany(Instruments::class, 'user_instrument', 'user_id', 'instrument_id');
    }

    public function musicGenres()
    {
        return $this->belongsToMany(Genres::class, 'user_music_genres', 'user_id', 'genre_id');
    }

    public function country()
    {
        return $this->hasOne(Country::class, 'id', 'country_id');
    }

    public function posts()
    {
        return $this->hasMany(Posts::class);
    }

    public function isFollowing()
    {
        return $this->hasMany(IsFollowingUser::class, 'user_id', 'id');
    }

    public function followedBy()
    {
        return $this->hasMany(FollowedByUser::class, 'user_id', 'id');
    }
}
