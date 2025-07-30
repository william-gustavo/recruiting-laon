<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Person; // Certifique-se de que o Model Person existe

class PersonSeeder extends Seeder
{
    public function run()
    {
        $people = [
            // Atores e Atrizes
            ['name' => 'Joaquin Phoenix'], ['name' => 'Scarlett Johansson'], ['name' => 'Emily Blunt'],
            ['name' => 'John Krasinski'], ['name' => 'Carey Mulligan'], ['name' => 'Bo Burnham'],
            ['name' => 'Taika Waititi'], ['name' => 'Roman Griffin Davis'], ['name' => 'Jason Bateman'],
            ['name' => 'Laura Linney'], ['name' => 'Amy Adams'], ['name' => 'Jared Harris'],
            ['name' => 'Stellan Skarsgård'], ['name' => 'Rebecca Ferguson'], ['name' => 'Tom Hanks'],
            ['name' => 'Leonardo DiCaprio'], ['name' => 'Brad Pitt'], ['name' => 'Margot Robbie'],

            // Diretores
            ['name' => 'John Krasinski'], ['name' => 'Emerald Fennell'], ['name' => 'Taika Waititi'],
            ['name' => 'Todd Phillips'], ['name' => 'Quentin Tarantino'], ['name' => 'Christopher Nolan'],
            ['name' => 'Denis Villeneuve'],
        ];

        foreach ($people as $person) {
            Person::firstOrCreate($person);
        }
    }
}
