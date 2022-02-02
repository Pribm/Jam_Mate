<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InstrumentCategories extends Model
{
    use HasFactory;

    protected $table = 'instrument_category';
    protected $guarded = ['id'];
}
