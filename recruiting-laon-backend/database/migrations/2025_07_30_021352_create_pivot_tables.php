<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePivotTables extends Migration
{
    public function up()
    {
        // Tabela Pivot para Elenco (item_person)
        Schema::create('item_person', function (Blueprint $table) {
            $table->id();
            $table->foreignId('item_id')->constrained()->onDelete('cascade');
            $table->foreignId('person_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });

        // Tabela Pivot para Gêneros (item_genre)
        Schema::create('item_genre', function (Blueprint $table) {
            $table->id();
            $table->foreignId('item_id')->constrained()->onDelete('cascade');
            $table->foreignId('genre_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });

        // Tabela Pivot para Prêmios (item_award)
        Schema::create('item_award', function (Blueprint $table) {
            $table->id();
            $table->foreignId('item_id')->constrained()->onDelete('cascade');
            $table->foreignId('award_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });

        // Agora, adicionamos a chave estrangeira do diretor na tabela 'items'
        Schema::table('items', function (Blueprint $table) {
            $table->foreign('director_id')->references('id')->on('people')->onDelete('cascade');
        });
    }

    public function down()
    {
        // Remove a chave estrangeira primeiro
        Schema::table('items', function (Blueprint $table) {
            $table->dropForeign(['director_id']);
        });
        
        Schema::dropIfExists('item_award');
        Schema::dropIfExists('item_genre');
        Schema::dropIfExists('item_person');
    }
}
