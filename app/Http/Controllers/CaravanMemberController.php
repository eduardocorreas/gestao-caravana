<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Caravan;
use App\Models\CaravanMember;
use App\Models\CaravanMemberPayment;

class CaravanMemberController extends Controller
{

    public function store(Request $request){
        try {

            $caravan = CaravanMember::create([
                'caravan_id'=> $request->caravan_id,
                'name'=> $request->name,
                'email'=> $request->email,
                'phone'=> $request->phone,
                'type'=> $request->type
            ]);

            return response()->json('Inscrição realizada com sucesso', 200);
        } catch (\Throwable $th) {
            return response()->json($th, 400);
        }
    }

    public function show(Request $request){
        try {
            $caravan = Caravan::where('slug', $request->slug)->first();
            $member = CaravanMember::where('id', $request->id)->first();
            $totalPayments = CaravanMemberPayment::where('caravan_member_id', $member->id)->sum('price');
            $payments = CaravanMemberPayment::where('caravan_member_id', $member->id)->get();

            return Inertia::render('CaravanMemberDetail',['caravan'=>$caravan,
            'payments'=> $payments, 'totalPayments'=> $totalPayments,
            'caravanMember'=> $member]);

        } catch (\Throwable $th) {
            return redirect('/dashboard');
        }
    }

    public function update(Request $request){
        try {

            $member = CaravanMember::find($request->id);

            $member->name = $request->name;
            $member->email = $request->email;
            $member->phone = $request->phone;
            $member->type = $request->type;

            $member->save();

            return response()->json('Dados atualizados com sucesso', 200);
        } catch (\Throwable $th) {
            return response()->json($th, 400);
        }
    }

    public function delete(Request $request){
        try {

            $member = CaravanMember::find($request->id);
            $member->delete();

            return response()->json('Membro excluído com sucesso', 200);
        } catch (\Throwable $th) {
            return response()->json($th, 400);
        }
    }
}
