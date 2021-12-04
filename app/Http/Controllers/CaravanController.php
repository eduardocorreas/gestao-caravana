<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Support\Str;
use App\Models\Caravan;
use App\Models\CaravanMember;
use App\Models\CaravanMemberPayment;
use App\Models\Cost;
use App\Models\ExtraValue;
use DB;

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
            $members = CaravanMember::where('caravan_id', $caravan->id)->limit(3)->get();

            $totalPayments = CaravanMemberPayment::where('caravan_id', $caravan->id)->sum('price');
            $totalExtraValues = ExtraValue::where('caravan_id',$caravan->id)->sum('price');
            $totalCosts = Cost::where('caravan_id', $caravan->id)->sum('price');

            $totalValue = $totalPayments + $caravan->initial_value + $totalExtraValues;

            $costs = Cost::where('caravan_id',$caravan->id)->limit(3)->get();
            $extraValues = ExtraValue::where('caravan_id',$caravan->id)->limit(3)->get();

            $totalGroupedCosts = DB::select('SELECT type, COUNT(id) AS qty, SUM(price) as total from costs GROUP BY type');
            $costLabels = [];
            $costValues = [];

            foreach ($totalGroupedCosts as $total) {
                array_push($costLabels, $total->type);
                array_push($costValues, $total->total);
            }

            $totalGroupedExtraValues = DB::select('SELECT type, COUNT(id) AS qty, SUM(price) as total from extra_values GROUP BY type');
            $extraValuesLabels = [];
            $extraValuesValues = [];

            foreach ($totalGroupedExtraValues as $total) {
                array_push($extraValuesLabels, $total->type);
                array_push($extraValuesValues, $total->total);
            }


            return Inertia::render('CaravanDetail',['caravan'=>$caravan, 'members'=> $members,
            'totalValue'=>$totalValue, 'totalPayments'=>$totalPayments,
            'costs'=> $costs, 'totalCosts'=> $totalCosts, 'costLabels'=> $costLabels,
            'costValues'=> $costValues, 'extraValues'=>$extraValues,
            'extraValuesLabels'=> $extraValuesLabels,
            'extraValuesValues'=> $extraValuesValues]);

        } catch (\Throwable $th) {
            return redirect('/dashboard');
        }
    }

    public function allMembers(Request $request){
        try {
            $caravan = Caravan::where('slug', $request->slug)->first();
            $members = CaravanMember::where('caravan_id', $caravan->id)->get();

            return Inertia::render('CaravanMembers',['caravan'=>$caravan, 'members'=> $members]);

        } catch (\Throwable $th) {
            return redirect('/dashboard');
        }
    }

    public function allCosts(Request $request){
        try {
            $caravan = Caravan::where('slug', $request->slug)->first();
            $costs = Cost::where('caravan_id',$caravan->id)->get();

            return Inertia::render('CaravanCosts',['caravan'=>$caravan, 'costs'=> $costs]);

        } catch (\Throwable $th) {
            return redirect('/dashboard');
        }
    }

    public function allExtraValues(Request $request){
        try {
            $caravan = Caravan::where('slug', $request->slug)->first();
            $extraValues = ExtraValue::where('caravan_id',$caravan->id)->get();

            return Inertia::render('CaravanExtraValue',['caravan'=>$caravan, 'extraValues'=> $extraValues]);

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
