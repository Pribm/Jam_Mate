<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IsFollowingUser extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function following()
    {
        return $this->belongsTo(User::class, 'is_following', 'id');
    }
}
