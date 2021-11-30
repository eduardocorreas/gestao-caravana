<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Support\Str;
use App\Models\Caravan;
use App\Models\CaravanMember;
use App\Models\CaravanMemberPayment;
use App\Models\Cost;

use Illuminate\Http\Request;

class CaravanController extends Controller
{
    public function index(){
        $caravans = Caravan::all();
        return Inertia::render('Dashboard',['caravans'=>$caravans]);
    }

    public function show(Request $request){
        try {
            $caravan = Caravan::where('slug', $request->slug)->first();
            $members = CaravanMember::where('caravan_id', $caravan->id)->get();

            $totalPayments = CaravanMemberPayment::where('caravan_id', $caravan->id)->sum('price');
            $totalValue = $totalPayments + $caravan->initial_value;

            $costs = Cost::where('caravan_id', $caravan->id)->get();
            $totalCosts = Cost::where('caravan_id', $caravan->id)->sum('price');

            return Inertia::render('CaravanDetail',['caravan'=>$caravan, 'members'=> $members,
            'totalValue'=>$totalValue, 'totalPayments'=>$totalPayments,
            'costs'=> $costs, 'totalCosts'=> $totalCosts]);

        } catch (\Throwable $th) {
            return redirect('/dashboard');
        }
    }

    public function store(Request $request){
        try {

            $caravan = Caravan::create([
                'name'=> $request->name,
                'year'=> $request->year,
                'initial_value'=> $request->initialValue,
                'billing_target'=> $request->billingTarget,
                'ticket_price'=> $request->ticketPrice,
                'slug'=> Str::snake($request->name.'-'.$request->year)
            ]);

            return response()->json('Caravana '.$caravan->name.' cadastrada com sucesso', 200);
        } catch (\Throwable $th) {
            return response()->json($th, 400);
        }
    }
}
