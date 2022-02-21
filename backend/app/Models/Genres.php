<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Genres extends Model
{
    use HasFactory;
    protected $table = 'genres';
    protected $guarded = ['id'];

    public function bands()
    {
        return $this->belongsToMany(Band::class, 'band_music_genres', 'band_id', 'genre_id');
    }
}
