<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CaravanMemberPayment extends Model
{
    use HasFactory;
    protected $fillable =['caravan_id', 'caravan_member_id', 'price'];
}
