<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Award; // Certifique-se de que o Model Award existe

class AwardSeeder extends Seeder
{
    public function run()
    {
        $awards = [
            ['name' => 'Oscar de Melhor Filme'],
            ['name' => 'Oscar de Melhor Diretor'],
            ['name' => 'Oscar de Melhor Ator'],
            ['name' => 'Oscar de Melhor Atriz'],
            ['name' => 'Oscar de Melhor Roteiro Original'],
            ['name' => 'Globo de Ouro de Melhor Filme - Drama'],
            ['name' => 'Critics Choice Award de Melhor Atriz'],
        ];

        foreach ($awards as $award) {
            Award::firstOrCreate($award);
        }
    }
}
