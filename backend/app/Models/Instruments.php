<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Instruments extends Model
{
    use HasFactory;

    protected $table = 'instruments';
    protected $guarded = ['id'];

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_instrument', 'instrument_id', 'user_id');
    }
    
}
