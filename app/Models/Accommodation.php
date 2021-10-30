<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Accommodation extends Model
{
    use HasFactory;
    protected $fillable =['caravan_id','name', 'price_per_day', 'state', 'city', 'accommodation_nights'];
}
