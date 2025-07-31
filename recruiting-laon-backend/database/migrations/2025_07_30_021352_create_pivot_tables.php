<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePivotTables extends Migration
{
    public function up()
    {
        // Tabela Pivot para Elenco (catalog_person)
        Schema::create('catalog_person', function (Blueprint $table) {
            $table->id();
            $table->foreignId('catalog_id')->constrained()->onDelete('cascade');
            $table->foreignId('person_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });

        // Tabela Pivot para Gêneros (catalog_genre)
        Schema::create('catalog_genre', function (Blueprint $table) {
            $table->id();
            $table->foreignId('catalog_id')->constrained()->onDelete('cascade');
            $table->foreignId('genre_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });

        // Tabela Pivot para Prêmios (catalog_award)
        Schema::create('catalog_award', function (Blueprint $table) {
            $table->id();
            $table->foreignId('catalog_id')->constrained()->onDelete('cascade');
            $table->foreignId('award_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });

        // Agora, adicionamos a chave estrangeira do diretor na tabela 'catalog'
        Schema::table('catalogs', function (Blueprint $table) {
            $table->foreign('director_id')->references('id')->on('people')->onDelete('cascade');
        });
    }

    public function down()
    {
        // Remove a chave estrangeira primeiro
        Schema::table('catalogs', function (Blueprint $table) {
            $table->dropForeign(['director_id']);
        });
        
        Schema::dropIfExists('catalog_award');
        Schema::dropIfExists('catalog_genre');
        Schema::dropIfExists('catalog_person');
    }
}
