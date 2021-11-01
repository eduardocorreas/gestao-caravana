<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCaravanMembersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('caravan_members', function (Blueprint $table) {
            $table->id();
            $table->string('caravan_id');
            $table->string('name');
            $table->string('email');
            $table->string('phone');
            $table->enum('type',['pilgrim', 'admin']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('caravan_members');
    }
}
