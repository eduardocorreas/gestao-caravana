<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\Cost;

class CostController extends Controller
{
    public function store(Request $request){
        try {

            $caravan = Cost::create([
                'caravan_id'=> $request->caravan_id,
                'description'=> $request->description,
                'price'=> $request->price,
                'notes'=> $request->notes,
                'type'=> $request->type,
            ]);

            return response()->json('Custo cadastrado com sucesso', 200);
        } catch (\Throwable $th) {
            return response()->json($th, 400);
        }
    }

    public function delete(Request $request){
        try {

            $cost = Cost::find($request->id);
            $cost->delete();

            return response()->json('Custo excluído com sucesso', 200);
        } catch (\Throwable $th) {
            return response()->json($th, 400);
        }
    }
}
