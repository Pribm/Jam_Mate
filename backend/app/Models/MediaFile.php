<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MediaFile extends Model
{
    use HasFactory;

    protected $table = 'media_file';
    protected $guarded = ['id'];


    public function posts(){
        $this->belongsTo(Posts::class);
    }
}
