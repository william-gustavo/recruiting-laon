<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCatalogTable extends Migration
{
    public function up()
    {
        Schema::create('catalogs', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['movie', 'series']); // Diferencia filme de série
            $table->string('title'); // Título principal (ex: "Bela Vingança")
            $table->string('original_title'); // Título original
            $table->year('year'); // Ano de lançamento
            $table->string('duration')->nullable(); // Duração (ex: "1h 53min")
            $table->text('synopsis'); // Sinopse
            $table->string('poster_url'); // URL do pôster
            $table->string('trailer_url')->nullable(); // URL do trailer
            $table->boolean('is_popular')->default(false); // Para a seção "Populares"
            
            // Chave estrangeira para o diretor
            $table->unsignedBigInteger('director_id')->nullable();
            // A definição da chave estrangeira será feita na migration da tabela pivot
            
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('catalogs');
    }
}