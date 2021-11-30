<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CaravanController;
use App\Http\Controllers\CaravanMemberController;
use App\Http\Controllers\CaravanMemberPaymentController;
use App\Http\Controllers\CostController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [CaravanController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::post('/caravana', [CaravanController::class, 'store'])->middleware(['auth'])->name('caravan-store');
Route::get('/caravana/{slug}', [CaravanController::class, 'show'])->middleware(['auth'])->name('caravan-show');

Route::post('/caravana/membro', [CaravanMemberController::class, 'store'])->middleware(['auth'])->name('caravan-member-store');
Route::put('/caravana/membro', [CaravanMemberController::class, 'update'])->middleware(['auth'])->name('caravan-member-update');
Route::delete('/caravana/membro/{id}', [CaravanMemberController::class, 'delete'])->middleware(['auth'])->name('caravan-member-delete');
Route::get('/caravana/{slug}/membro/{id}', [CaravanMemberController::class, 'show'])->middleware(['auth'])->name('caravan-show');
Route::post('/caravana/membro/pagamento', [CaravanMemberPaymentController::class, 'store'])->middleware(['auth'])->name('caravan-member-payment-store');

Route::post('/caravana/custos', [CostController::class, 'store'])->middleware(['auth'])->name('caravan-cost-store');
Route::delete('/caravana/custos/{id}', [CostController::class, 'delete'])->middleware(['auth'])->name('caravan-cost-delete');

require __DIR__.'/auth.php';

