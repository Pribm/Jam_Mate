<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Band extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
    protected $table = 'bands';
    protected $hidden = ['pivot'];

    public function user()
    {
        return $this->belongsToMany(User::class, 'band_user', 'band_id', 'user_id')->withPivot('user_id');
    }

    public function genres()
    {
        return $this->belongsToMany(Genres::class,'band_music_genres', 'band_id', 'genre_id');
    }
}
