<?php

namespace App\Models;

use Database\Factories\FollowingFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IsFollowingUser extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
    protected $table = 'is_following_users';

    protected static function newFactory()
    {
        return FollowingFactory::new();
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'is_following', 'id');
    }

    public function posts()
    {
        return $this->hasMany(Posts::class, 'user_id', 'is_following');
    }
}
