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

    public function followedUsersPost()
    {
        return $this->belongsTo(Follow::class, 'user_id', 'followed_user_id');
    }
}
