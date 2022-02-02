<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FollowedByUser extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
    protected $table = 'followed_by_users';

    public function follower()
    {
        return $this->belongsTo(User::class, 'is_followed_by', 'id');
    }
}
