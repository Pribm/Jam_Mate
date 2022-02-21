<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('band_music_genres', function (Blueprint $table) {
            $table->id();
            $table->foreignId('band_id');
            $table->foreignId('genre_id');
            $table->timestamps();

            $table->foreign('band_id')->references('id')->on('bands');
            $table->foreign('genre_id')->references('id')->on('genres');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('band_music_genres');
    }
};
