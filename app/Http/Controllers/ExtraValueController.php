<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\ExtraValue;

class ExtraValueController extends Controller
{
    public function store(Request $request){
        try {

            $caravan = ExtraValue::create([
                'caravan_id'=> $request->caravan_id,
                'description'=> $request->description,
                'price'=> $request->price,
                'type'=> $request->type,
            ]);

            return response()->json('Valor extra cadastrado com sucesso', 200);
        } catch (\Throwable $th) {
            return response()->json($th, 400);
        }
    }

    public function delete(Request $request){
        try {

            $extraValue = ExtraValue::find($request->id);
            $extraValue->delete();

            return response()->json('Valor extra excluído com sucesso', 200);
        } catch (\Throwable $th) {
            return response()->json($th, 400);
        }
    }
}
