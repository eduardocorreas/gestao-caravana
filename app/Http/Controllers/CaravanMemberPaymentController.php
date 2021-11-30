<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\CaravanMemberPayment;

class CaravanMemberPaymentController extends Controller
{

    public function store(Request $request){
        try {

            $caravan = CaravanMemberPayment::create([
                'caravan_id'=> $request->caravan_id,
                'caravan_member_id'=> $request->caravan_member_id,
                'price'=> $request->price
            ]);

            return response()->json('Pagamento registrado com sucesso', 200);
        } catch (\Throwable $th) {
            return response()->json($th, 400);
        }
    }
}
