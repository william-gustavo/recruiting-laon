<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Genre;

class GenreSeeder extends Seeder
{
    public function run()
    {
        $genres = [
            ['name' => 'Drama'], ['name' => 'Crime'], ['name' => 'Thriller'],
            ['name' => 'Ação'], ['name' => 'Aventura'], ['name' => 'Ficção Científica'],
            ['name' => 'Comédia'], ['name' => 'Fantasia'], ['name' => 'Terror'],
            ['name' => 'Mistério'], ['name' => 'Romance'], ['name' => 'Animação'],
        ];

        foreach ($genres as $genre) {
            Genre::firstOrCreate($genre);
        }
    }
}
