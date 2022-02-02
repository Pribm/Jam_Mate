<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserInstruments extends Model
{
    use HasFactory;
    protected $table = 'user_instrument';
    protected $guarded = ['id'];
}
