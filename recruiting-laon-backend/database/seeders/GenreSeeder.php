<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Genre;

class GenreSeeder extends Seeder
{
    public function run()
    {
        $genres = [
            ['name' => 'Drama'],
            ['name' => 'Suspense'],
            ['name' => 'Comédia'],
            ['name' => 'Crime'],
            ['name' => 'Ficção Científica'],
            ['name' => 'Aventura'],
            ['name' => 'Ação'],
            ['name' => 'Faroeste'],
            ['name' => 'Terror'],
            ['name' => 'Mistério'],
            ['name' => 'Fantasia'],
            ['name' => 'História'],
            ['name' => 'Biografia'],
            ['name' => 'Animação'],
            ['name' => 'Romance'],
            ['name' => 'Thriller'],
            ['name' => 'Velho Oeste']
        ];
        
        foreach ($genres as $genre) {
            Genre::firstOrCreate($genre);
        }
    }
}
