<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Posts extends Model
{
    use HasFactory;

    protected $table = 'posts';
    protected $guarded = ['id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function media()
    {
        return $this->hasMany(MediaFile::class, 'post_id');
    }

    public function following()
    {
        return $this->belongsTo(IsFollowingUser::class, 'user_id', 'is_following');
    }
}
