<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CaravanMember extends Model
{
    use HasFactory;
    protected $fillable =['caravan_id', 'user_id', 'type'];
}
