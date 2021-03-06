<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExtraValue extends Model
{
    use HasFactory;
    protected $fillable =['caravan_id', 'description', 'price', 'type'];
}
